import { generate_tpl } from '@omni-door/utils';

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

export default generate_tpl({
  tpl 
}, 'tpl');