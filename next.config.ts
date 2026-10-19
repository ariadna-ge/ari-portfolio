import type { NextConfig } from "next";
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

const basePath = isGitHubActions ? '/ari-portfolio' : ''

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
