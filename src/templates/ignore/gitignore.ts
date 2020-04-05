import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`
.idea
.DS_Store
*~
~*

.nyc_output
.docz
.omni_cache
node_modules
lib
es
dist

package-lock.json

*.log
\``;

export default tpl_engine_init({
  tpl 
}, 'tpl');