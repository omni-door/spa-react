const tpl = 
`\`
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": \${
      (eslint || stylelint || prettier) && test
        ? '"npm run lint && npm run test"'
        : (eslint || stylelint || prettier)
            ? '"npm run lint"'
            : test
              ? '"npm run test"'
              : ''},
    "commit-msg": "npm run lint:commit"
  }
},
"lint-staged": {
  \${eslint ? \`"src/**/*.{js,jsx,ts,tsx}": [
    "\${'npm run lint:es_fix'}"\${prettier ? \`,
    "\${'npm run lint:prettier_fix'}"\` : ''}
  ]\${eslint && stylelint ? ',' : ''}\` : ''}
  \${stylelint ? \`"src/**/*.{css,scss,sass,less}": [
    "\${'npm run lint:style_fix'}"\${prettier ? \`,
    "\${'npm run lint:prettier_fix'}"\` : ''}
  ]\` : ''}
},
\``;

export default tpl;