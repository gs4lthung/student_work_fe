/**
 * Convert from number to Vietnamese string.
 * By Dong Hung Phung <donghung.viethanit@gmail.com>
 */

// Thanks to: Dong Hung Phung for a great implementation

export class VietnameseNumberReader {
  private static readonly defaultNumbers = " hai ba bốn năm sáu bảy tám chín";

  private static readonly dict = {
    units: ("? một" + this.defaultNumbers).split(" "),
    tens: ("lẻ mười" + this.defaultNumbers).split(" "),
    hundreds: ("không một" + this.defaultNumbers).split(" "),
  };

  private static readonly digits = ["x", "nghìn", "triệu", "tỉ", "nghìn"];

  private static tenth(block: string): string {
    const [tensDigit, unitDigit] = block.split("").map(Number);
    let unitWord = this.dict.units[unitDigit];
    const result = [this.dict.tens[tensDigit]];

    if (tensDigit > 0 && unitDigit === 5) {
      unitWord = "lăm";
    }

    if (tensDigit > 1) {
      result.push("mươi");
      if (unitDigit === 1) unitWord = "mốt";
    }

    if (unitWord !== "?") result.push(unitWord);
    return result.join(" ");
  }

  private static blockOfThree(block: string): string {
    if (block.length === 1) return this.dict.units[+block];

    if (block.length === 2) return this.tenth(block);

    const [hundreds, ...rest] = block.split("");
    const result = [this.dict.hundreds[+hundreds], "trăm"];
    const restStr = rest.join("");

    if (restStr !== "00") {
      result.push(this.tenth(restStr));
    }

    return result.join(" ");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static getDigitLabel(index: number, digitCounter: number): string | null {
    return this.digits[index] || null;
  }

  public static toVietnamese(input: number | string, currency?: string): string {
    const raw = parseInt(input.toString()).toString();

    if (!raw || isNaN(+raw)) return "";

    const blocks: string[] = [];
    for (let i = raw.length; i > 0; i -= 3) {
      blocks.push(raw.substring(Math.max(i - 3, 0), i));
    }

    const result: string[] = [];
    let digitCounter = 0;

    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      if (block === "000") {
        digitCounter++;
        if (i === 2 && digitCounter === 2) {
          const label = this.getDigitLabel(i + 1, digitCounter);
          if (label) result.push(label);
        }
      } else {
        digitCounter = 0;
        result.push(this.blockOfThree(block));
        const label = this.getDigitLabel(i, digitCounter);
        if (label && label !== "x") result.push(label);
      }
    }

    if (currency) result.push(currency);
    return result.join(" ").replace(/\s+/g, " ").trim();
  }

  public static formatNumber(n: number | string): string {
    const parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
