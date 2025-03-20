export const stringify = (params: Record<string, unknown>) => {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};


export const stringifyUrl = (url: string, params: Record<string, unknown>) => {
  return `${url}?${stringify(params)}`;
};
