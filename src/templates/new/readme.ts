import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`
# \${componentName}

## Example

\\\`\\\`\\\`\${ts ? 'tsx' : 'jsx'}
<\${componentName} />
\\\`\\\`\\\`
\``

export default tpl_engine_new({
  tpl
}, 'tpl');