const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

// Public URLs used by the app at runtime. Defaults keep local dev working.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const SITE_URL = trimTrailingSlash(siteUrl);
export const API_BASE_URL = trimTrailingSlash(apiBaseUrl);

export const buildUrl = (path: string) => new URL(path || "/", `${SITE_URL}/`).toString();
export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
