---
date: 2021-12-12
lastmod: 2021-12-23
title: Notes on Cloudflare Workers
---

Cloudflare
Github

```bash
# install wrangler CLI
npm i -g @cloudflare/wrangler

wrangler login
```

```bash
# install gh CLI (completely optional)
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

## Secrets

You can `put`, `delete` and `list` your secrets. passing a `--env` value is optional

```bash
wrangler secret delete <name> --env ENVIRONMENT_NAME
```

## Secrets vs. KV

Secrets are environment variables for your worker function while KV is for application data in the Cloudflare network that can be accessed from Workers

## Using KV with TypeScript

List all KV namespaces associated with an account ID.

```bash
wrangler kv:namespace list
```

Create a KV namespace with the following command. This will also give you the snippet to add to your `wrangler.toml`

```bash
wrangler kv:namespace create "MY_KV"
```

```toml
kv-namespaces = [
  { binding = "MY_KV", id = "1e239640775c428fb68239640775cac6" }
]
```

- it has to be [`kv-namespaces` with a hyphen](https://github.com/cloudflare/wrangler/issues/1156#issuecomment-1000389175) and not `kv_namespaces` with an underscore
- the `binding` value does not need to match the name of the KV namespace, the link is based on `id`

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

Using the KV values in your project:

```ts
const UNSPLASH_ACCESS_KEY = await MY_KV.get('UNSPLASH_ACCESS_KEY')
```
