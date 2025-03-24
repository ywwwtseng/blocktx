export class NumberUtils {
  /**
   * 将数字补零至少5位数
   * @param num 原始数字
   * @returns 补零后的字符串
   */
  static padNumber(num: number): string {
    // 如果数字大于等于5位，直接返回
    if (num >= 10000) {
      return num.toString();
    }
    
    // 否则补零至5位
    return num.toString().padStart(5, "0");
  }
} 