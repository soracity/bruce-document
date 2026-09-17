
| Validator                   | 説明                   |
| --------------------------- | -------------------- |
| `Validators.required`       | 必須入力                 |
| `Validators.requiredTrue`   | `true`必須（チェックボックスなど） |
| `Validators.min(n)`         | 最小値                  |
| `Validators.max(n)`         | 最大値                  |
| `Validators.minLength(n)`   | 最小文字数                |
| `Validators.maxLength(n)`   | 最大文字数                |
| `Validators.pattern(regex)` | 正規表現                 |
| `Validators.email`          | メールアドレス形式            |
| `Validators.nullValidator`  | 常にOK（何もしない）          |
| `Validators.compose([...])` | 複数Validatorを1つにまとめる  |

