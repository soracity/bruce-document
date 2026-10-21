#!/usr/bin/env python3
"""文書・参照・固定原典の構造監査。意味の承認やアプリ合格を自動判定しない。"""
from pathlib import Path
from collections import Counter, defaultdict
import argparse, hashlib, json, re, subprocess
from urllib.parse import unquote
from functools import lru_cache

parser=argparse.ArgumentParser()
parser.add_argument('--code-root',type=Path,help='任意: code-source/とacg-source/を含む取得済みソースroot')
parser.add_argument('--source-cache',type=Path,help='固定原典 <root>/<commit>/<path>。hash検証は省略しない')
parser.add_argument('--repository-tree',type=Path,help='同一保存地点のGitHub recursive tree JSON（疎な取得のリンク検査）')
args=parser.parse_args()
HERE=Path(__file__).resolve().parent
DESIGN=HERE.parent
REPO=DESIGN.parent
errors=[]
def need(condition,message):
    if not condition: errors.append(message)
@lru_cache(maxsize=None)
def git_file(commit,path):
    if args.source_cache:return (args.source_cache/commit/path).read_bytes()
    return subprocess.check_output(['git','show',f'{commit}:{path}'],cwd=REPO)
def digest(data): return hashlib.sha256(data).hexdigest()
def blob(data): return hashlib.sha1(f'blob {len(data)}\0'.encode()+data).hexdigest()
def load(name): return json.loads((HERE/name).read_text())

manifest=load('source-manifest.json');requirements=load('requirements.json');units=load('source-units.json');code=load('code-source-manifest.json')
need(len(manifest)==19,'対象議事録19件ではない')
need(len(requirements)==159,'対象内規則159件ではない')
excluded=load('requirements-excluded.json')
need(len(excluded)==9,'対象外規則9件ではない')
need(not ({r['id'] for r in requirements}&{r['id'] for r in excluded}),'対象内外規則ID重複')
need(all(re.match(r'01_ai-document/phase[1-4]_',m['path']) for m in manifest),'対象外原典混入')
supplementary=load('resume-state.json')['inputs']['supplementary_sources']
for m in supplementary:
    data=git_file(m['commit'],m['path'])
    need(digest(data)==m['sha256'] and blob(data)==m['blob'],f"補助正本hash不一致:{m['path']}")
need(all('議事録バックアップ' not in m['path'] for m in manifest),'除外フォルダが対象に混入')
source={};covered=defaultdict(set)
for m in manifest:
    data=git_file(m['commit'],m['path']);source[m['path']]=data.decode().splitlines()
    need(digest(data)==m['sha256'] and blob(data)==m['gitBlob'],f"原典hash不一致: {m['path']}")
    need(len(data)==m['bytes'] and len(source[m['path']])==m['lines'],f"原典サイズ/行数不一致: {m['path']}")
reqids=[r['id'] for r in requirements];need(len(reqids)==len(set(reqids)),'規則ID重複');reqset=set(reqids)
ledger=(DESIGN/'16_仕様台帳.md').read_text()
for r in requirements:
    row=next((line for line in ledger.splitlines() if line.startswith('| '+r['id']+' |')), '')
    need(row.endswith('| '+','.join(r['tests'])+' |'),f"16章とテスト索引の不一致:{r['id']}")
canonical=['01_アーキテクチャ・責務境界.md','02_共通スタイル・UiStyleUtil.md','03_Table・Swipe.md','04_AI実装・例外運用.md','05_表示・レスポンシブ・CSS.md','06_LayoutManager・静的検査.md','07_DTO・Form・ACG.md','11_ACG型・Nullable・Validation詳細.md','12_ACG形式・必須・デフォルト詳細.md','13_通常UI・Header・TabBar.md','14_テスト仕様.md','15_差分・移行.md','18_承認履歴・未決事項.md','21_実装補足・幾何計算と互換HTML.md','27_共通UI・計測・日付の実装補完.md','28_Table・Swipeの実装補完.md','29_静的検査器・ACGの実装補完.md']
implids=re.findall(r'^\| (IMP-\d+) \|',(DESIGN/'09_実装対象・仕様対応表.md').read_text(),re.M)
testids=re.findall(r'^\| (T-[A-Z]+-\d+) \|',(DESIGN/'14_テスト仕様.md').read_text(),re.M)
need(len(implids)==len(set(implids)),'実装ID重複');need(len(testids)==len(set(testids)),'テストID重複')
need(len(testids)==194,'テスト仕様194件ではない')
extra=load('stage2-extra-tests.json')
need(len(extra)==26 and len({t['id'] for t in extra})==26,'追加回帰テスト26件の不一致')
need({t['id'] for t in extra}<=set(testids),'追加回帰テストIDの本文なし')
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
changes=load('stage2-changes.json');findings={c['id'] for c in changes}
need(findings=={f'F{i:02d}' for i in range(1,30)} and len(changes)==29,'F01〜F29不一致')
chapter32=(DESIGN/'32_工程2_修正結果と検証契約.md').read_text()
need(re.findall(r'^\| (F\d{2}) ',chapter32,re.M)==[c['id'] for c in changes],'32章とJSONのID不一致')
for c in changes:
    need(all((DESIGN/f).is_file() for f in c['files']),f"修正先なし:{c['id']}")
    need(bool(c['change']) and bool(c['sources']),f"修正内容/根拠なし:{c['id']}")
    need(set(c['tests'])<=set(testids),f"修正テストなし:{c['id']}")
    row=next((l for l in chapter32.splitlines() if l.startswith('| '+c['id']+' ')), '')
    need(c['change'] in row and all(f in row for f in c['files']) and all(t in row for t in c['tests']),f"32章とJSON内容不一致:{c['id']}")
need(len(units)==91,'照合単位91件ではない')
for u in units:
    unitids.append(u['id']);need(u['source'] in source,f"対象外の本文単位: {u['source']}")
    if u['source'] not in source:continue
    lines=source[u['source']];a,b=u['start'],u['end'];need(1<=a<=b<=len(lines),f"本文範囲不正:{u['id']}")
    # 現行91単位のhash契約は対象行をLF結合し末尾LFを1つ付加する。
    raw='\n'.join(lines[a-1:b])+'\n'
    need(digest(raw.encode())==u['sha256'],f"本文hash不一致:{u['id']}")
    need(bool(u['meaning']) and bool(u['state']) and bool(u['design']),f"意味/状態/設計対応なし:{u['id']}")
    need(set(u['findings'])<=findings,f"未知の修正ID:{u['id']}")
    covered[u['source']].update(range(a,b+1));seen_blocks.setdefault(u['sha256'],u['sha256'])
need(len(unitids)==len(set(unitids)),'本文単位ID重複')
for path,lines in source.items():
    missing=[i for i,t in enumerate(lines,1) if t.strip() and i not in covered[path]]
    need(not missing,f'未対応の非空行: {path}:{missing[:5]}')
# Markdownのローカル参照とfence。コード内の記載はリンクとして検査しない。
missing_links=[];unclosed=[]
repo_paths=None
if args.repository_tree:
    tree=json.loads(args.repository_tree.read_text())
    need(not tree.get('truncated',False),'repository tree省略')
    repo_paths={x['path'] for x in tree['tree']}
def link_exists(path):
    if path.exists():return True
    if repo_paths is None:return False
    try:return path.resolve().relative_to(REPO.resolve()).as_posix() in repo_paths
    except ValueError:return False
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
            target=unquote(target.split('#')[0])
            if target and not link_exists(p.parent/target):missing_links.append([str(p.relative_to(REPO)),no,target])
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
result={'result':'failed' if errors else 'passed','minutesInScope':len(manifest),'supplementarySources':len(supplementary),'excludedRules':len(excluded),'stage2Findings':len(changes),'sourceLines':sum(m['lines'] for m in manifest),'uniqueBlocks':len(seen_blocks),'sourceOccurrences':len(units),'rules':len(requirements),'implementationTargets':len(implids),'testSpecifications':len(testids),'missingLocalLinks':missing_links,'unclosedFences':unclosed,'wbsRows':len(rows),'wbsStates':dict(counts),'codeFilesHashChecked':code_checked,'errors':errors,'semanticApproval':'manual review required; not decided by this script','applicationTests':'not executed'}
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
