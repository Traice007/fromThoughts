import nextConfig from "eslint-config-next";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...nextConfig,
  {
    ignores: [".vercel/**"],
  },
];
