# Neon Setup Instructions

Run these commands in your terminal to set up Neon for this project:

## Step 1: Install Neon CLI and login

```bash
npm i -g neon@latest
neon login
```

## Step 2: Initialize Neon skills

```bash
neon skills -y
```

## Step 3: Set up MCP

```bash
neon mcp -y
```

## Step 4: Link to your Neon project

```bash
neon link --project-id super-bar-38210853 --branch production -y
```

## Step 5: Initialize Neon config

```bash
neon config init
```

## Step 6: Update configuration files

The `neon config init` command will create `neon.ts` and `hello.ts`. Replace their contents:

### `neon.ts`

```ts
import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  preview: {
    functions: {
      api: { name: "api", source: "./hello.ts" },
    },
  },
});
```

### `hello.ts`

```ts
export default async function hello(): Promise<Response> {
  return new Response("Hello from Neon Functions");
}
```

## Step 7: Deploy

```bash
neon deploy
```

---

## After Neon setup is complete

Once deployed, Neon will provide you with a DATABASE_URL. Update your `.env.local`:

```env
DATABASE_URL=<your_neon_connection_string>
ADMIN_PASSWORD=your_password
COOKIE_SECRET=long_random_string
```

Then run the database schema:

1. Go to https://console.neon.tech
2. Select your project "super-bar-38210853"
3. Go to SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Execute the query

Finally, start your development server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000/admin/login to start managing content!
