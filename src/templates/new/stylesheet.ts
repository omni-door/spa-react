import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`
.\${componentName} {
  display: block;
}
\``

export default tpl_engine_new({
  tpl
}, 'tpl');