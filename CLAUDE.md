# Working on Recallr

Rules for anyone (including AI assistants) changing this repo:

- Commit as `abyyworld <annolieberto@gmail.com>` (author and committer). Run `git config user.name abyyworld` and `git config user.email annolieberto@gmail.com` in the clone first.
- No AI attribution anywhere: no `Co-Authored-By` lines, no session links, no assistant names in commit messages, branch names, code comments or content.
- Branch names describe the change (e.g. `add-databases-module`), never a tool or assistant name.
- No em dashes in any file or commit message.
- Follow the content rules in README.md: original exercises only, labelled with their source; never course files, solutions or assessed work.
- Before committing a module change, run its test script and `node scripts/build.js`, and commit the regenerated `answers.json` and `docs/`.
