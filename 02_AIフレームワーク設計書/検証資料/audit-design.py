#!/usr/bin/env python3
"""文書・参照・固定原典の構造監査。意味の承認やアプリ合格を自動判定しない。"""
from pathlib import Path
from collections import Counter, defaultdict
import argparse, hashlib, json, re, subprocess

parser=argparse.ArgumentParser()
parser.add_argument('--code-root',type=Path,help='任意: code-source/とacg-source/を含む取得済みソースroot')
args=parser.parse_args()
HERE=Path(__file__).resolve().parent
DESIGN=HERE.parent
REPO=DESIGN.parent
errors=[]
def need(condition,message):
    if not condition: errors.append(message)
def git_file(commit,path):
    return subprocess.check_output(['git','show',f'{commit}:{path}'],cwd=REPO)
def digest(data): return hashlib.sha256(data).hexdigest()
def blob(data): return hashlib.sha1(f'blob {len(data)}\0'.encode()+data).hexdigest()
def load(name): return json.loads((HERE/name).read_text())

manifest=load('source-manifest.json');requirements=load('requirements.json');units=load('source-units.json');code=load('code-source-manifest.json')
need(len(manifest)==34,'新議事録34件ではない')
need(all('議事録バックアップ' not in m['path'] for m in manifest),'除外フォルダが対象に混入')
source={};covered=defaultdict(set)
for m in manifest:
    data=git_file(m['commit'],m['path']);source[m['path']]=data.decode().splitlines()
    need(digest(data)==m['sha256'] and blob(data)==m['gitBlob'],f"原典hash不一致: {m['path']}")
    need(len(data)==m['bytes'] and len(source[m['path']])==m['lines'],f"原典サイズ/行数不一致: {m['path']}")
reqids=[r['id'] for r in requirements];need(len(reqids)==len(set(reqids)),'規則ID重複');reqset=set(reqids)
canonical=['01_アーキテクチャ・責務境界.md','02_共通スタイル・UiStyleUtil.md','03_Table・Swipe.md','04_AI実装・例外運用.md','05_表示・レスポンシブ・CSS.md','06_LayoutManager・静的検査.md','07_DTO・Form・ACG.md','11_ACG型・Nullable・Validation詳細.md','12_ACG形式・必須・デフォルト詳細.md','13_通常UI・Header・TabBar.md','14_テスト仕様.md','15_差分・移行.md','18_承認履歴・未決事項.md','21_実装補足・幾何計算と互換HTML.md','27_共通UI・計測・日付の実装補完.md','28_Table・Swipeの実装補完.md','29_静的検査器・ACGの実装補完.md']
implids=re.findall(r'^\| (IMP-\d+) \|',(DESIGN/'09_実装対象・仕様対応表.md').read_text(),re.M)
testids=re.findall(r'^\| (T-[A-Z]+-\d+) \|',(DESIGN/'14_テスト仕様.md').read_text(),re.M)
need(len(implids)==len(set(implids)),'実装ID重複');need(len(testids)==len(set(testids)),'テストID重複')
need(len(implids)==39,'実装対象39件の索引不一致')
reqs_by_impl=defaultdict(set);roots=set()
for r in requirements:
    for field in ['sources','design','implementations','tests']:need(bool(r.get(field)),f"対応なし: {r['id']}/{field}")
    for name in r['design']:need((DESIGN/name).exists(),f"本文なし: {r['id']}/{name}")
    for name in r['implementations']:
        need(name in implids,f"実装IDなし: {r['id']}/{name}");reqs_by_impl[name].add(r['id'])
    for name in r['tests']:need(name in testids,f"テストIDなし: {r['id']}/{name}")
    for q in r['sources']:
        need('議事録バックアップ' not in q['path'],f"除外原典参照: {r['id']}")
        data=git_file(q['commit'],q['path']).decode().splitlines()
        need(1<=q['start']<=q['end']<=len(data),f"原典行範囲不正: {r['id']}")
        roots.add(q['path'])
for name in implids: need(bool(reqs_by_impl[name]),f'根拠対応のない実装対象: {name}')
need(set(testids)<={t for r in requirements for t in r['tests']},'規則へ逆追跡できないテストIDあり')
need(set(source)<=roots,'規則から戻れない新議事録あり')
unitids=[];seen_blocks={}
for u in units:
    unitids.append(u['id']);need(u['source'] in source,f"対象外の本文単位: {u['source']}")
    lines=source[u['source']];a,b=u['start'],u['end'];need(1<=a<=b<=len(lines),f"本文範囲不正:{u['id']}")
    raw='\n'.join(lines[a-1:b]).strip()
    need(digest(raw.encode())==u['sha256'],f"本文hash不一致:{u['id']}")
    need(bool(u['rules']) and set(u['rules'])<=reqset,f"本文規則対応なし:{u['id']}")
    need(bool(u['context']) and bool(u['review']),f"文脈/判断理由なし:{u['id']}")
    covered[u['source']].update(range(a,b+1));seen_blocks.setdefault(u['block'],u['sha256'])
need(len(unitids)==len(set(unitids)),'本文単位ID重複')
for path,lines in source.items():
    missing=[i for i,t in enumerate(lines,1) if t.strip() and i not in covered[path]]
    need(not missing,f'未対応の非空行: {path}:{missing[:5]}')
# Markdownのローカル参照とfence。コード内の記載はリンクとして検査しない。
missing_links=[];unclosed=[]
for p in sorted(DESIGN.rglob('*.md')):
    fence=None
    for no,line in enumerate(p.read_text().splitlines(),1):
        m=re.match(r'^ {0,3}(`{3,}|~{3,})',line)
        if m:
            token=m[1]
            if fence is None:fence=token
            elif token[0]==fence[0] and len(token)>=len(fence):fence=None
            continue
        if fence:continue
        for m in re.finditer(r'(?<!\\)\[[^\]]+\]\(([^\s)]+)(?:\s+"[^"]*")?\)',line):
            target=m[1]
            if re.match(r'^(?:https?:|mailto:|#)',target):continue
            target=target.split('#')[0]
            if target and not (p.parent/target).exists():missing_links.append([str(p.relative_to(REPO)),no,target])
    if fence:unclosed.append(str(p.relative_to(REPO)))
need(not missing_links,f'ローカルリンク切れ:{missing_links[:10]}');need(not unclosed,f'fence未閉鎖:{unclosed}')
# 21章の掲載関数と同梱関数が一致しているか。
geom=re.findall(r'```js\n(.*?)\n```',(DESIGN/'21_実装補足・幾何計算と互換HTML.md').read_text(),re.S)[0]
need((HERE/'table-geometry.mjs').read_text().strip()==geom.strip(),'21章と計算用関数が不一致')
# WBSの状態は進捗記録。A/B合格と同一視しない。
wbs=(REPO/'01_ai-document/AIフレームワーク_進捗管理表.md').read_text();rows=[]
for line in wbs.splitlines():
    a=[x.strip().replace('**','') for x in line.split('|')]
    if len(a)>=11 and re.fullmatch(r'\d+\.\d+\.\d+',a[3]):rows.append(a)
counts=Counter(a[5] for a in rows)
need(len(rows)==79,'WBS総数が79でない')
need(counts=={'完了':49,'進行中':1,'未着手':29},f'WBS状態の差異:{counts}')
code_checked=0
if args.code_root:
    for c in code:
        sub='code-source' if c['repository']=='soracity/bruce' else 'acg-source'
        p=args.code_root/sub/c['path']
        need(p.is_file(),f'比較ソースなし:{c["path"]}')
        if p.is_file():
            data=p.read_bytes();need(blob(data)==c['blob'] and digest(data)==c['sha256'],f'比較ソースhash差異:{c["path"]}');code_checked+=1
result={'result':'failed' if errors else 'passed','newMinutes':len(manifest),'sourceLines':sum(m['lines'] for m in manifest),'uniqueBlocks':len(seen_blocks),'sourceOccurrences':len(units),'rules':len(requirements),'implementationTargets':len(implids),'testSpecifications':len(testids),'missingLocalLinks':missing_links,'unclosedFences':unclosed,'wbsRows':len(rows),'wbsStates':dict(counts),'codeFilesHashChecked':code_checked,'errors':errors,'semanticApproval':'manual review required; not decided by this script','applicationTests':'not executed'}
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
