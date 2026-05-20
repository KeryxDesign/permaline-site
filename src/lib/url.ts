const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + "/";

export const withBase = (path: string): string => {
  if (!path) return base;
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return base + path.replace(/^\/+/, "");
};
