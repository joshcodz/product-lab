# Neon MCP Server Setup Instructions

The Neon MCP server configuration needs to be added manually due to Kiro permissions.

## Manual Setup Required

Since I cannot write directly to `.kiro/settings/mcp.json`, you need to create or update this file manually.

### For User-Level (Global) MCP Config

**File:** `C:\Users\joshu\.kiro\settings\mcp.json`

**Create or update with:**

```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": [
        "-y",
        "@neondatabase/mcp-server-neon"
      ],
      "env": {
        "NEON_API_KEY": "YOUR_API_KEY_HERE"
      },
      "disabled": false
    }
  }
}
```

### For Workspace-Level (Project) MCP Config

**File:** `C:\Users\joshu\Product Lab\.kiro\settings\mcp.json`

Same content as above, but this only applies to this workspace.

---

## Getting Your NEON_API_KEY

### Option 1: Using the Neon CLI (Recommended)

```bash
# Install Neon CLI if not already installed
npm i -g neon

# Login (opens browser)
neon login

# Generate an MCP-specific API key
neon mcp --agent kiro -y
```

This command will automatically:
- Create an API key
- Write the MCP server config to the correct location

### Option 2: Manual API Key from Neon Console

1. Go to https://console.neon.tech
2. Navigate to your account settings
3. Go to "API Keys" section
4. Click "Generate new API key"
5. Give it a name like "Kiro MCP Server"
6. Copy the key
7. Replace `YOUR_API_KEY_HERE` in the JSON above with your key

---

## Verifying the Setup

After adding the MCP config:

1. Restart Kiro or reload the workspace
2. Check that the Neon MCP server appears in your MCP tools list
3. Test by using a Neon MCP command (e.g., listing projects)

---

## Alternative: OAuth Setup (More Secure)

For OAuth-based authentication (no API key stored):

```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": [
        "-y",
        "@neondatabase/mcp-server-neon"
      ],
      "disabled": false
    }
  }
}
```

Then run:
```bash
neon mcp --oauth --agent kiro -y
```

This will prompt you to sign in via browser and authorize the MCP server.
