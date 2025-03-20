export const stringify = (params: Record<string, any>) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};


export const stringifyUrl = (url: string, params: Record<string, any>) => {
  return `${url}?${stringify(params)}`;
};
