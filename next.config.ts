import type { NextConfig } from "next";

const backendBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

const backendStoragePattern = (() => {
  try {
    const parsed = new URL(backendBaseUrl);

    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname: "/storage/**",
    };
  } catch {
    return {
      protocol: "http" as const,
      hostname: "localhost",
      port: "8000",
      pathname: "/storage/**",
    };
  }
})();

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      backendStoragePattern,
    ],
  },
};

export default nextConfig;
