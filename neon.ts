import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  // Enable Neon Auth (Managed Better Auth)
  // Uncomment when you want to add login/sessions
  // auth: true,

  // AI Gateway for LLM calls
  // Uncomment when you want unified access to LLMs
  // aiGateway: true,

  // Object Storage for files/uploads
  // Uncomment and add buckets when needed
  // buckets: {
  //   uploads: {
  //     access: "private",
  //   },
  //   public: {
  //     access: "public",
  //   },
  // },

  // Neon Functions for APIs, WebSocket servers, long-running agents
  // Uncomment and add functions when needed
  // functions: {
  //   api: {
  //     name: "API Handler",
  //     source: "./api/index.ts",
  //   },
  // },

  // Data API (PostgREST compatibility)
  // Only enable if migrating from Supabase or need PostgREST
  // dataApi: true requires auth: true
  // dataApi: true,

  // Branch configuration
  // Uncomment to set policies for new branches
  // branch: (branch) => {
  //   if (branch.exists) {
  //     return {}; // Don't modify existing branches
  //   }
  //   if (branch.name.startsWith("dev-")) {
  //     return {
  //       ttl: "7d", // Auto-cleanup after 7 days
  //       postgres: {
  //         computeSettings: {
  //           autoscalingLimitMinCu: 0.25, // Scale to zero
  //           autoscalingLimitMaxCu: 1,
  //           suspendTimeout: "5m",
  //         },
  //       },
  //     };
  //   }
  //   return {};
  // },
});
