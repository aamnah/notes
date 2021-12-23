---
date: 2021-12-12
lastmod: 2021-12-23
title: Notes on Cloudflare Workers
---

Cloudflare
Github

```bash
npm i -g @cloudflare/wrangler

wrangler login



curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

gh auth login

# create a remote repository from the current directory
gh repo create my-project --private --source=. --remote=origin
```

## Debugging

```bash
wrangler tail
```

will show you live logs

## Using KV with TypeScript

add your KV namespace to `wrangler.toml`

```bash
wrangler kv:namespace create "MY_KV"
```

```toml
kv_namespaces = [
  { binding = "MY_KV", id = "1e239640775c428fb68239640775cac6" }
]
```

create a `bindings.d.ts` in your `src` directory and define your namespace as a `KVNamespace`

```ts
export {}

declare global {
  const SOME_ENV_VAR: string
  const SOME_SECRET: string
  const MY_KV: KVNamespace
}
```

and make sure you have [`workers-types` added to the project](https://github.com/cloudflare/workers-types) and your `tsconfig.json` has a minimum of the following (which it will have if you generated the project using the default typescript template)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "types": ["@cloudflare/workers-types"]
  }
}
```
