---
title: Setting Yarn config defaults globally
date: 2021-02-26
slug: set-yarn-config-global-defaults
---

- Check existing config with `yarn config list`
- The global config is save in `~/.yarnrc.yml` (Yarn 2.0 onwards. previously it was called `.yarnrc`)

```bash
# yarn config set <key> <value> [-g|--global]

yarn config set init-author-name 'Aamnah' -g
yarn config set init-author-email 'hello@aamnah.com' -g
yarn config set init-author-url 'http://aamnah.com' -g
yarn config set init-license 'CC-BY-SA-4.0' -g
yarn config set init-version '0.0.1' -g
```

unlike setting `npm` defaults, the `-g` flag must come at the end of the command.

```bash
yarn config v1.22.10
info yarn config
{
  'version-tag-prefix': 'v',
  'version-git-tag': true,
  'version-commit-hooks': true,
  'version-git-sign': false,
  'version-git-message': 'v%s',
  'init-version': '0.0.1',
  'init-license': 'CC-BY-SA-4.0',
  'save-prefix': '^',
  'bin-links': true,
  'ignore-scripts': false,
  'ignore-optional': false,
  registry: 'https://registry.yarnpkg.com',
  'strict-ssl': true,
  'user-agent': 'yarn/1.22.10 npm/? node/v14.16.0 darwin arm64',
  'init-author-email': 'hello@aamnah.com',
  'init-author-name': 'Aamnah',
  'init-author-url': 'http://aamnah.com'
}
info npm config
{}
✨  Done in 0.01s.
```

Alternatively, you can set the config in `~/.yarnrc.yml`

```bash
# ~/.yarnrc.yml

init-author-name: 'Aamnah'
init-author-email: 'hello@aamnah.com'
init-author-url: 'http://aamnah.com'
init-license: 'CC-BY-SA-4.0'
init-version: '0.0.1'
```
