import type { NextConfig } from "next";

// Pages that saved personal data were removed when Lumina went public.
// Send old bookmarks home instead of a 404.
const removed = ["/journal", "/prayers", "/favorites", "/garden", "/write", "/devotionals", "/read"];

const nextConfig: NextConfig = {
  async redirects() {
    return removed.map((source) => ({ source, destination: "/", permanent: false }));
  },
};

export default nextConfig;
