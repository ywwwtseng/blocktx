export class JsonUtils {
  static parse(src: unknown) {
    try {
      if (typeof src !== "string") {
        return src;
      }
  
      return JSON.parse(src);
    } catch {
      return null;
    }
  }
}
