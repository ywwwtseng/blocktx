export class URLUtils {
  static stringify(params: Record<string, unknown>) {
    return Object.entries(params)
      .filter(([, value]) => value !== null && value !== '' && value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }

  static stringifyUrl(url: string, params: Record<string, unknown>) {
    return `${url}?${this.stringify(params)}`;
  }
}
