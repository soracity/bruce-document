|処理時間|コミットID（ハッシュ）|親コミットID（ハッシュ）|ポインタ(参照先ハッシュ)|処理内容|
|---|---|---|---|---|
|10:05|Ver1| | |test1.txtをコミット|
|10:10| |Ver1|branch1 -> Ver1|branch1 作成（コミットなし）|
|10:15|Ver2|Ver1| |（別ライン）コミット|
|10:20| |Ver1|branch2 -> Ver1|branch2 作成（コミットなし）|
|10:25|Ver3|Ver2| |（別ライン）コミット|
|10:30|Ver4|Ver1|branch1 -> Ver4|(branch1 上で) test1.txt をコミット|
|10:35|Ver5|Ver4|branch1 -> Ver5|(branch1 上で) test2.txt をコミット|

- コミット履歴：
git log --graph --pretty=format:'%ci %h %d %s' --date=iso --all | less -r

- ブランチ作成：
```
  1. リポジトリのルートをに移動
     （確認方法）git rev-parse --show-toplevel

  2. 最新の情報を取得\
     git fetch origin

  3. develop に移動して最新に合わせる\
     git switch develop
     git pull --ff-only origin develop

  4. ブランチ作成（develop の先端から作る）
     git switch -c feature/feature-20251212

  5. ローカル作業ができたらリモートにプッシュして upstream を設定
     git push -u origin feature/feature-20251212
```
