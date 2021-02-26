---
title: Setting Yarn config defaults globally
date: 2021-02-26
slug: set-yarn-config-global-defaults
---

- Check existing config with `yarn config list`
- If you run the command to list config with a `--verbose` flag, it tells you which files it looked into for config and which ones it loaded from `yarn config list --verbose`
- The global config is save in `~/.yarnrc.yml` (Yarn 2.0 onwards. previously it was called `.yarnrc`)
- if you set a config flag in a dir where there is no `.yarnrc.yml`, it'll add the config to the global config file at `~/.yarnrc.yml`

```bash
# yarn config set <key> <value> [-g|--global]

yarn config set init-license 'CC-BY-SA-4.0' -g
yarn config set init-version '0.0.1' -g
```

- unlike setting `npm` defaults, the `-g` flag must come at the end of the command.
- `init-author-name`, `init-author-email`, and `init-author-url` are not available

```bash
# yarn config list

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
}
info npm config
{}
✨  Done in 0.01s.
```

```bash
# yarn config list --verbose
yarn config v1.22.10
verbose 0.128760292 Checking for configuration file "/Users/aamnah/Sites/.npmrc".
verbose 0.1288705 Checking for configuration file "/Users/aamnah/.npmrc".
verbose 0.128933125 Checking for configuration file "/Users/aamnah/.nvm/versions/node/v14.16.0/etc/npmrc".
verbose 0.128995583 Checking for configuration file "/Users/aamnah/Sites/.npmrc".
verbose 0.129038833 Checking for configuration file "/Users/aamnah/.npmrc".
verbose 0.129080542 Checking for configuration file "/Users/.npmrc".
verbose 0.129333083 Checking for configuration file "/Users/aamnah/Sites/.yarnrc".
verbose 0.129394208 Checking for configuration file "/Users/aamnah/.yarnrc".
verbose 0.129435708 Found configuration file "/Users/aamnah/.yarnrc".
verbose 0.129813583 Checking for configuration file "/Users/aamnah/.nvm/versions/node/v14.16.0/etc/yarnrc".
verbose 0.129904458 Checking for configuration file "/Users/aamnah/Sites/.yarnrc".
verbose 0.129972667 Checking for configuration file "/Users/aamnah/.yarnrc".
verbose 0.13001825 Found configuration file "/Users/aamnah/.yarnrc".
verbose 0.130115708 Checking for configuration file "/Users/.yarnrc".
verbose 0.131106792 current time: 2021-02-26T06:25:40.816Z
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
}
info npm config
{}
✨  Done in 0.01s.
```

Alternatively, you can set the config in `~/.yarnrc.yml`

```bash
# ~/.yarnrc.yml (Yarn 2.0 berry)

initLicense: 'CC-BY-SA-4.0'
initVersion: '0.0.1'
```

## Links

- [yarn config](https://classic.yarnpkg.com/en/docs/cli/config/)
- https://github.com/yarnpkg/yarn/issues/3010#issuecomment-695192320
