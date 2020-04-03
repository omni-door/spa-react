const tpl = 
`\`
    "lint": "\${prettier ? \`\${'npm run lint:prettier'}\${eslint || stylelint ? ' && ' : ''}\` : ''}\${eslint ? \`\${'npm run lint:es'}\${stylelint ? ' && npm run lint:style' : ''}\` : ''}",
    "lint:fix": "\${prettier ? \`\${'npm run lint:prettier_fix'}\${eslint || stylelint ? ' && ' : ''}\` : ''}\${eslint ? \`\${'npm run lint:es_fix'}\${stylelint ? ' && npm run lint:style_fix' : ''}\` : ''}",
\``;

export default tpl;