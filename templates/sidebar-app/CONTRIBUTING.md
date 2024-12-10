# Contributing Guide

## Preparing

You can checkout the code and install the dependencies with:

```bash
git clone URL_TO_YOUR_PROJECT/PROJECT_NAME.git
cd PROJECT_NAME
npm install
npm run dev
```

## Testing Changes

After any changes run the existent the unit tests, and add new ones if needed. Run the following command to run the Vitest unit tests:

```bash
npm test
```

You can also run the tests for only a single file in the `Run and Debug` view by selecting the configuration `Current Test File`. To bring up the `Run and Debug` view, select the Run and Debug icon in the Activity Bar on the side of VS Code. Alternatively, you can use the keyboard shortcut `⇧⌘D` (Windows/Linux: `Ctrl+Shift+D`).

## Contributions guidelines

We encourage you to adhere to the following guidelines:

### Commit style

Each commit message consists of a header, an optional `body` and `footer`. The header has a special format that includes a `type` and a `subject`:

```
<type>: <subject>
<BLANK LINE>
[Optional]<body>
<BLANK LINE>
[Optional]<footer>
```
The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

#### Subject
The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body
Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

#### Type
Use the following `prefix` to indicates the type of the change:

- `build` for maintenance tasks, e.g., `chore: bump typescript version`
- `fix` for bug fixes, e.g., `fix: catch unhandled exception`
- `feat` for new features, e.g., `feat: add type inference for sites`
- `docs` for improvements in the general documentation (manual, readme, etc.) and source code, e.g., `docs: add section for registering changesets`
- `perf`: A code change that improves performance
- `chore`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests

If the commit reverts a previous commit, it should begin with `revert`: , followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.

To draw attention to about a breaking change use `!` after the type prefix.

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6
```

### Coding style

Follow the code guidelines described below:

- Use `camelCase` variables and function/methods. For example, `const  userName = 'Peter'` and `getUserName(){}`.
- Use `kebab-case` for file names. For example, if the name consists of multiple words, separate them using hyphens (-) e.g., `eva-utils`. 
- Ensure `npm run lint` pass. You can run `npm run format` to format the code, or `npm run check` to lint and format the code all at once.

### Create merge requests

After your contributions have been locally tested and they are ready to merge with the "*master*", create a new *Merge Request*, and after merged **REMOVE** your development branch.

### Generating changelogs
Run the `npm changeset` command to add the chang to be listed in package changelogs. To jump to the next type of change use the  `Enter` key, and the Tab key to select the desired type of change to register.

```bash
> npx changeset
> What kind of change is this for compiler? (current version is 3.2.1)  
 [*] patch
 [ ] minor
 [ ] major
> Please enter a summary for this change (this will be in the changelogs).
    (submit empty line to open external editor)
Summary · Unify declarations with their corresponding DSL clases.
  
=== Summary of changesets ===
patch:  @ssrbell/myapp
  
> Is this your desired changeset? (Y/n) · true
> Changeset added! - you can now commit it
  
 If you want to modify or expand on the changeset summary, you can find it here
 info /path/to/project/.changeset/dry-cars-float.md
```
For the field `Summary of changesets` you can use the summary provided by the Merge Request.

Here is a summary to help you pick the right type for your contributions:
- Major: Breaking changes, significant updates.
- Minor: New features, backward-compatible improvements.
- Patch: Bug fixes, backward-compatible changes.

**Note**: Not every source code change requires a changeset. Changesets are focused on releases
and changelogs, changes in the repository that don't require these won't need a changeseOnce a 
new version of the compiler is released all the .md files in .changeset are removed automatically.

## Releases

To release a new version of your app, run the following command:

```bash
npm run release
```

The above command will publish a new package's version if its current version is newever than the one currently listed on the used (private) npm registry.
The `release` command internally executes three other sub-commands. 
- First, `npx changeset version` consumes all changes in your repo, and updates it to the most appropriate [semver](https://semver.org) version based on its current changesets (Note: there is no need to update the package version manually). It also writes changelog entries for each consumed changeset. 
- Second, it publishes the new version of the package in the used (private) npm registry.
- Third, it pushes both commits and the associated annotated tags to the remote repository. 
