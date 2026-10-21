/** 工程③ IMP-31: 詳細設計書12章DEFAULT-02準拠の独立実装。
 * 日付は端末ローカルの暦日、日時は同一時刻のUTC ISO文字列。
 * 生成器側で日時を固定埋め込みしないためメソッド呼出し時に取得する。
 */
export class AppDateUtil {
  private constructor() {}

  static getSysDateIso8601(): string {
    const now = new Date();
    const year = String(now.getFullYear()).padStart(4, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getSysDateTimeUtcIso8601(): string {
    return new Date().toISOString();
  }
}
