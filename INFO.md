# Claude Demo

## Claude

<https://www.claude.com/product/claude-code>

Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows -- all through natural language commands.

Company: Anthropic

Alternatives: Gemini (Google), Codex (OpenAI)

### Installation

```bash
npm install -g @anthropic-ai/claude-code
```

### MPC Servers

MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems.

List of available MCP server: <https://github.com/modelcontextprotocol/servers?tab=readme-ov-file>

#### MCP Installation

- Playwright (<https://github.com/microsoft/playwright-mcp>)

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

- Context7 (<https://github.com/upstash/context7>)

```bash
claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: YOUR_API_KEY"
```

- Shadcn (<https://ui.shadcn.com/docs/mcp>)

```bash
npx shadcn@latest mcp init --client claude
```

### Start Claude

```bash
claude
```

## Project Setup

```bash
> mkdir claude-demo
> cd claude-demo
> npx create-next-app@latest .
> npx shadcn@latest init
> npx run dev
```

## Links

<https://claude-code-idea-board.vercel.app/>

<https://jira.pagu.at/browse/SHOPARCHITECTURE-6791>

<https://github.com/karkow/claude-demo>
