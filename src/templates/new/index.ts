import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`
import \${componentName} from './\${componentName}';

export { \${componentName}\${ts ? \`, \${componentName}Props\` : ''} } from './\${componentName}';
export default \${componentName};
\``

export default tpl_engine_new({
  tpl
}, 'tpl');