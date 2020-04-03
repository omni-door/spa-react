import { generate_tpl } from '@omni-door/utils';
import script_test from './script_test';
import script_commitlint from './script_commitlint';
import script_lint from './script_lint';
import script_lint_es from './script_lint_es';
import script_lint_prettier from './script_lint_prettier';
import script_lint_style from './script_lint_style';
import commitlint from './commitlint';
import resolutions from './resolutions';


const tpl = 
`\`
{
  "name": "\${project_name.toLowerCase()}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    \${alter('test', 'script_test')}
    \${include('script_lint')}
    \${alter('eslint', 'script_lint_es')}
    \${alter('prettier', 'script_lint_prettier')}
    \${alter('stylelint', 'script_lint_style')}
    \${alter('commitlint', 'script_commitlint')}
    "new": "omni new",
    "build": "omni build",
    "release": "omni release"
  },
  \${alter('commitlint', 'commitlint')}
  "keywords": [],
  "author": "",
  \${
    (type_react && ts && \`\${alter_strategy('strategy', {
      stable: 'resolutions'
    })}\`) || ''
  }
  "license": "ISC"
}
\``

export default (type_react: string) => generate_tpl({
  tpl,
  script_test,
  script_commitlint,
  script_lint,
  script_lint_es,
  script_lint_prettier,
  script_lint_style,
  commitlint,
  resolutions
}, 'tpl', {
  type_react
});


// console.log(eng('@15.5.0')({
//   ts: false,
//   project_name: 'test123',
//   project_type: 'toolkit',
//   style: 'css',
//   strategy: 'stable',
//   test: true,
//   eslint: true,
//   prettier: false,
//   commitlint: true,
//   stylelint: true,
// }));