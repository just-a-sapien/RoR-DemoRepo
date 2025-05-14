# RoR-DemoRepo

Demo Rails app for testing an AI-powered PR review bot.

## Setup

```bash
bundle install
rails db:create db:migrate
rails server 

### Using the AI PR-Bot

1. Install the GitHub MCP Server and configure `.vscode/mcp.json`.  
2. Open Copilot Chat in Agent mode.  
3. Enter your PAT when prompted.  
4. Ask: “Review all open PRs…”  