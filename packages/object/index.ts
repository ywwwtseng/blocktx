export const prune = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== undefined)
  );
};
