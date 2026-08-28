import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['import', 'global-builtin'],
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};

export default nextConfig;
