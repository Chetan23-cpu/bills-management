/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      "better-sqlite3": "./src/lib/empty-module.js",
      "sqlite3": "./src/lib/empty-module.js",
      "pg": "./src/lib/empty-module.js",
      "pg-query-stream": "./src/lib/empty-module.js",
      "pg-native": "./src/lib/empty-module.js",
      "oracledb": "./src/lib/empty-module.js",
      "tedious": "./src/lib/empty-module.js",
      "mysql": "./src/lib/empty-module.js",
      "mariadb": "./src/lib/empty-module.js",
      "mariadb/callback": "./src/lib/empty-module.js",
    },
  },
};

export default nextConfig;