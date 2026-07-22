import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "api.ts",
      schemas: "schemas",
      workspace: "lib/api/generated",
      client: "fetch",
      httpClient: "fetch",
      baseUrl: "",
      mock: false,
    },
  },
});
