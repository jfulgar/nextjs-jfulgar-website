import type { NextConfig } from "next";
import { execSync } from "child_process";

const commitCount = (() => {
  try {
    return execSync("git rev-list --count HEAD").toString().trim();
  } catch {
    return "0";
  }
})();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_COUNT: commitCount,
  },
};

export default nextConfig;
