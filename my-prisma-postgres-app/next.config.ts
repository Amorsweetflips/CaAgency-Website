import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopack: {
      resolveAlias: {
        '.prisma/client': path.resolve(__dirname, 'lib/prisma-client'),
      },
    },
  },
};

export default withBotId(nextConfig);
