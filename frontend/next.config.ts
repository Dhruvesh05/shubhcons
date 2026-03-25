import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const allowedHosts = new Set<string>(["localhost", "127.0.0.1"]);

const maybeAddHost = (value?: string) => {
  if (!value) return;
  try {
    const url = new URL(value);
    allowedHosts.add(url.hostname);
  } catch {
    // Ignore invalid URLs so build still succeeds.
  }
};

maybeAddHost(process.env.NEXT_PUBLIC_API_BASE_URL);
maybeAddHost(process.env.NEXT_PUBLIC_SITE_URL);

const remotePatterns: RemotePattern[] = Array.from(allowedHosts).flatMap<RemotePattern>((hostname) => ([
  { protocol: "https", hostname, pathname: "/**" },
  { protocol: "http", hostname, pathname: "/**" },
]));

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
