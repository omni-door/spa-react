import babel from './babel';
import commitlint from './commitlint';
import eslint from './eslint';
import eslintignore from './eslintignore';
import gitignore from './gitignore';
import npmignore from './npmignore';
import jest from './jest';
import omni from './omni';
import pkj from './package';
import prettier from './prettier';
import readme from './readme';
import tsconfig from './tsconfig';
import stylelint from './stylelint';
import source_index_react from './source/index_react';
import source_html from './source/html';
import source_d from './source/declaration';
import source_index_style from './source/style';
import source_index_reset from './source/reset';
import webpack_config_common from './webpack/common';
import webpack_config_dev from './webpack/dev';
import webpack_config_prod from './webpack/prod';
import component_class from './new/class_component';
import component_functional from './new/functional_component';
import component_index from './new/index';
import component_readme from './new/readme';
import component_stylesheet from './new/stylesheet';
import component_test from './new/test';

export { default as babel } from './babel';
export { default as commitlint } from './commitlint';
export { default as eslint } from './eslint';
export { default as eslintignore } from './eslintignore';
export { default as gitignore } from './gitignore';
export { default as npmignore } from './npmignore';
export { default as jest } from './jest';
export { default as omni } from './omni';
export { default as pkj } from './package';
export { default as prettier } from './prettier';
export { default as readme } from './readme';
export { default as tsconfig } from './tsconfig';
export { default as stylelint } from './stylelint';
export { default as source_index_react } from './source/index_react';
export { default as source_html } from './source/html';
export { default as source_d } from './source/declaration';
export { default as source_index_style } from './source/style';
export { default as source_index_reset } from './source/reset';
export { default as webpack_config_common } from './webpack/common';
export { default as webpack_config_dev } from './webpack/dev';
export { default as webpack_config_prod } from './webpack/prod';
export { default as component_class } from './new/class_component';
export { default as component_functional } from './new/functional_component';
export { default as component_index } from './new/index';
export { default as component_readme } from './new/readme';
export { default as component_stylesheet } from './new/stylesheet';
export { default as component_test } from './new/test';

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
  prettier,
  readme,
  stylelint,
  tsconfig,
  source_index_react,
  source_html,
  source_d,
  source_index_style,
  source_index_reset,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod,
  component_class,
  component_functional,
  component_index,
  component_readme,
  component_stylesheet,
  component_test
};

type TPLS = {
  [T in keyof typeof tpls]: typeof tpls[T];
};

export type TPLS_INITIAL = Omit<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test'
>;

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

export type TPLS_NEW = Pick<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test'
>;

export type TPLS_NEW_FN = TPLS_NEW[keyof TPLS_NEW];

export type TPLS_NEW_RETURE = Partial<TPLS_NEW>;

export default tpls;