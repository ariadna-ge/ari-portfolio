import type { NextConfig } from "next";
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  basePath: isGitHubActions ? '/ari-portfolio' : '',
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
