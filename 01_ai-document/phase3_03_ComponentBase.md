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





### 2026-10-20 正式承認：ComponentBaseとFormControlComponentBaseの分離

- **設計判断：承認済み**。ユーザーが「分割OK」と明示。従来の「1つのComponentBaseに任意FormControlも集約する」案は**撤回**。上記「旧議事録の具体的内容」は履歴として保存し、現行の実装指示には使用しない。
- **承認構造**：`ComponentBase` は角丸・シャドー・枠線・背景色などの共通スタイルInputを一元管理。既存の `FormControlComponentBase<T>` は `ComponentBase` を継承し、FormControlとその変更検知を管理する。FormControl不要のButton・TableCell・Group等は `ComponentBase` を直接継承。Textbox・Date・Radio等のFormControl利用Componentは `FormControlComponentBase<T>` を継承する（各Componentの実際のFormControl利用有無は実装時に確認）。
- **理由**：共通スタイルの一元管理とFormControlの責務分離を両立し、不要なFormControlプロパティを非入力Componentに持たせない。
- **実装・検証**：未着手・未検証。AngularのInput継承、既存変更検知との整合、適用対象をPhase 5で検証する。設計決定はこの承認を優先し、旧統合案に戻さない。

## 旧議事録（原文・承認日・検討経緯）

- [phase3_UIデザインシステム標準化_議論記録.md](議事録バックアップ/phase3_UIデザインシステム標準化_議論記録.md)

## 議事録更新ルール

この工程の新しい議論は対応する小区分見出しの下へ日時・検討案・決定／未決・理由・次の作業を追記し、同時に[進捗管理表](AIフレームワーク_進捗管理表.md)を更新する。旧議事録は改変しない。

### 2026-10-20 追加承認：共通Signal InputとComponent別既定値
- 共通Signal Inputは`ComponentBase`で一元定義し、子Componentでは再定義しない。
- Component固有の既定値は基底クラスの既定値取得メソッドを子Componentでoverrideする方式とする。画面の明示指定値を最優先し、未指定時にComponent固有既定値を適用する。
- 概念例：`roundedSize = input<UiRoundedSize>()`、`getDefaultRoundedSize()`をTableCell等でoverrideし、実効値は`this.roundedSize() ?? this.getDefaultRoundedSize()`とする。
- `FormControlComponentBase<T>`は`ComponentBase`を継承し、FormControl関連責務を維持する。
- 設計承認済み。Angular Signal Input継承時の実動作確認、実装・検証は未実施。
