# CCFK Starter Templates

Create a CCFK application from starter templates.

## Quick Start

You can start to build a CCFK-based application with create `ccfk` command:

```bash
# npm
npm create ccfk@latest

# yarn
yarn create ccfk

# pnpm
pnpm create ccfk@latest

# bun
bun create ccfk@latest

# deno
deno run -A npm:create-ccfk@latest
```

## Options

#### `-t, --template <template>`

You can specify the desired template from the command line. This is useful for automation, where you'd like to skip any interactive prompts.

```
npm create ccfk@latest ./my-ccfk-app -- --template hello-world-app
```

#### `-i, --install`

Install dependencies after cloning template.

```
npm create ccfk@latest ./my-ccfk-app -- --install
```

#### `-p, --pm <pnpm|bun|deno|npm|yarn>`

Allows you to specify which package manager to use.

```
npm create ccfk@latest ./my-ccfk-app -- --pm pnpm
```

#### `-o, --offline`

Use the local cache instead of fetching the latest templates.

```
npm create ccfk@latest ./my-ccfk-app -- --offline
```
