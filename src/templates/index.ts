import {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig
} from '@omni-door/tpl-common';
import source_index_react from './source/index_react';
import source_html from './source/html';
import source_d from './source/declaration';
import webpack_config_common from './webpack/common';
import webpack_config_dev from './webpack/dev';
import webpack_config_prod from './webpack/prod';

export {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig
} from '@omni-door/tpl-common';
export { default as source_index_react } from './source/index_react';
export { default as source_html } from './source/html';
export { default as source_d } from './source/declaration';
export { default as webpack_config_common } from './webpack/common';
export { default as webpack_config_dev } from './webpack/dev';
export { default as webpack_config_prod } from './webpack/prod';

const tpls = {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  omni,
  pkj,
  readme,
  stylelint,
  tsconfig,
  source_index_react,
  source_html,
  source_d,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod
};

export type TPLS_INITIAL = {
  [T in keyof typeof tpls]: typeof tpls[T];
};

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

export default tpls;