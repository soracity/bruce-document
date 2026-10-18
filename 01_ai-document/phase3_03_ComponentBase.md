# Phase 3.3 ComponentBase

> **工程表の中区分：3.3 ComponentBase**／再編成日：2026-10-18  
> [進捗管理表](AIフレームワーク_進捗管理表.md) ／ [旧議事録バックアップ](議事録バックアップ/)  
> これは工程別議事録。**承認済み／検討中／未決／実装／検証**を区別する。最終設計書は全議論終了後に作成する。

## 従来の議論からの引継ぎ

ComponentBaseを単一基底にする方向で合意。FormControlComponentBaseとの整合・Angular Input継承制約は検証が必要。

## 3.3.1 単一ComponentBaseの継承・Input仕様を最終確定

- **作業**：未着手／**設計**：方針合意／**実装**：未着手／**検証**：未検証
- **具体的な対象**：単一ComponentBaseの継承・Input仕様を最終確定。ComponentBaseを単一基底にする方向で合意。FormControlComponentBaseとの整合・Angular Input継承制約は検証が必要。
- **必要な確認・判断**：既存FormControlComponentBase／Angular継承制約を確認。未確定の方式は既存ソースや原典を確認してから比較・承認する。
- **成果・完了条件**：既存規則・対象Component・利用側の影響と検証方法を記録する。未着手の工程であり、実装済み・承認済みとは扱わない。
- **状態**：作業=未着手、設計=方針合意、実装=未着手、検証=未検証。
- **次の作業**：既存FormControlComponentBase／Angular継承制約を確認
- **原典**：[phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

### 旧議事録の具体的内容（方針合意・未承認を区別）

> [旧議事録の原典](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)を転記。Phase 3は最終承認前であり、これを実装済みとは扱わない。

#### 4. ComponentBase：親クラスは1つに統一

`UiStyleComponentBase` と `FormControlComponentBase` を分けず、**共通デザインInput・visible・任意のFormControl Inputを1つの `ComponentBase` に持たせる**方針。

FormControlを使わないButton等も同じ基底クラスを継承するが、controlは使用しない。

```ts
export abstract class ComponentBase {
  readonly control = input<FormControl>();

  protected getControl(): FormControl {
    const control = this.control();
    if (control === undefined) {
      throw new Error('FormControlが指定されていません');
    }
    return control;
  }

  // 共通デザインInput群はここに定義する
}
```

- 親画面から既存の `FormControl` インスタンスを渡す。例：`<app-textbox [control]="dto.formGroup.controls.playerName" />`
- `input(new FormControl(''))` のようなダミーインスタンスは**作らない**。
- `getControl()` は入力系コンポーネントで利用し、未指定時には明示的にエラーとする。
- 不必要な `?.` や `!` に依存しない書き方を優先する。
- FormControlの有効・無効はFormControlで管理し、Button等のdisabledは部品個別に扱う。

**実装前検証**：既存 `FormControlComponentBase` の処理との整合、Angularの継承・型・テンプレートからのprotectedメソッド参照を確認する。設計を勝手に変更せず、制約があれば説明して再協議する。



### 旧再開サマリの工程別原文（2026-10-15の履歴）

> 過去の議論の記録です。「未承認」「次回の議題」の記載は当時のもので、現在の承認・進捗には優先しません。
<!-- HISTORICAL-SUMMARY-SECTIONS: 2.6 -->

#### 2.6 ComponentBase（方針合意）

`UiStyleComponentBase` と `FormControlComponentBase` を分けず、**1つのComponentBaseに統一**する方向。

- 共通デザインInput
- visible
- 任意のFormControl Input

を持つ。

FormControlを使わないButton等も同じ基底クラスを継承するが、controlは使用しない。

```ts
export abstract class ComponentBase {
  readonly control = input<FormControl>();

  protected getControl(): FormControl {
    const control = this.control();
    if (control === undefined) {
      throw new Error('FormControlが指定されていません');
    }
    return control;
  }

  // 共通デザインInput群
}
```

方針：

- 親画面から既存FormControlインスタンスを渡す。
- ダミー `new FormControl('')` は作らない。
- 入力系Componentは `getControl()` で未指定を明示エラーにする。
- 不要な `?.` / `!` に依存しない。
- FormControlのenable/disableはFormControlで管理。
- Button等のdisabledはComponent個別責務。

実装前に既存 `FormControlComponentBase`、Angular継承/Input、型、templateアクセス制約を検証する。

制約が見つかった場合、AIが勝手に設計変更せず説明して再協議する。

---

## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。
