import path from 'path';
import {
  arr2str,
  intersection,
  PKJTOOL,
  STYLE,
  STRATEGY
} from '@omni-door/tpl-common';
import {
  babel as babelConfigJs,
  commitlint as commitlintConfigJs,
  eslint as eslintrcJS,
  eslintignore,
  gitignore,
  jest as jestConfigJs,
  npmignore,
  omni as omniConfigJs,
  pkj as packageJson,
  readme as readMe,
  stylelint as stylelintConfigJs,
  tsconfig as tsConfigJson,
  source_index_react,
  source_html,
  source_d,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod,
  TPLS_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import {
  exec,
  logErr,
  logWarn,
  output_file,
  logSuc
} from '@omni-door/tpl-utils';

const default_tpl_list = {
  babel: babelConfigJs,
  commitlint: commitlintConfigJs,
  eslint: eslintrcJS,
  eslintignore,
  gitignore,
  jest: jestConfigJs,
  npmignore,
  omni: omniConfigJs,
  pkj: packageJson,
  readme: readMe,
  stylelint: stylelintConfigJs,
  tsconfig: tsConfigJson,
  source_index_react,
  source_html,
  source_d,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod
};

export type ResultOfDependencies = string[] | { add?: string[]; remove?: string[]; };

export type InitOptions = {
  strategy: STRATEGY;
  projectName: string;
  initPath: string;
  configFileName?: string;
  ts: boolean;
  test: boolean;
  eslint: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  pkgtool?: PKJTOOL;
  isSlient?: boolean;
  tpls?: (tpls: TPLS_INITIAL) => TPLS_INITIAL_RETURE;
  dependencies?: (dependecies_default: string[]) => ResultOfDependencies;
  devDependencies?: (devDependecies_default: string[]) => ResultOfDependencies;
  error?: () => any;
  success?: () => any;
};

async function init ({
  strategy = 'stable',
  projectName: name,
  initPath,
  configFileName = 'omni.config.js',
  ts,
  test,
  eslint,
  commitlint,
  style,
  stylelint,
  tpls,
  pkgtool = 'yarn',
  isSlient,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => {
    logErr('单页应用项目初始化失败！(The single-page-application project initialization has been occured some error!)');
    process.exit(1);
  },
  success = () => logSuc('单页应用项目初始化完成！(The single-page-application project initialization has been completed!)')
}: InitOptions) {
  // reset illegal strategy
  let custom_tpl_list = {};
  try {
    custom_tpl_list = typeof tpls === 'function'
      ? tpls(default_tpl_list)
      : custom_tpl_list;

    for (const tpl_name in custom_tpl_list) {
      const name = tpl_name as keyof TPLS_INITIAL_RETURE;
      const list = custom_tpl_list as TPLS_INITIAL_RETURE;
      const tpl = list[name];
      const tplFactory = (config: any) => {
        try {
          return tpl && tpl(config);
        } catch (err) {
          logWarn(JSON.stringify(err));
          logWarn(`自定义模板 [${name}] 解析出错，将使用默认模板进行初始化！(The custom template [${name}] parsing occured error, the default template will be used for initialization!)`);    
        }

        return default_tpl_list[name](config);
      };

      (list[name] as TPLS_INITIAL_FN) = tplFactory as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(JSON.stringify(err_tpls));
    logWarn('生成自定义模板出错，将全部使用默认模板进行初始化！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...default_tpl_list, ...custom_tpl_list };
  const testFrame = 'jest';
  const devServer = 'basic';
  const build = 'webpack';
  const project_type = 'spa-react';

  // default files
  const content_omni = tpl.omni({
    project_type,
    build,
    ts,
    test,
    testFrame,
    eslint,
    commitlint,
    style,
    stylelint,
    mdx: false
  });
  const content_pkg = tpl.pkj({
    project_type,
    name,
    ts,
    devServer,
    testFrame,
    eslint,
    commitlint,
    stylelint,
    strategy
  });
  const content_gitignore = tpl.gitignore();
  const content_indexReactTpl = tpl.source_index_react({ build, devServer, project_type, ts });
  const content_indexHtml = tpl.source_html({ name });

  // tsconfig
  const content_ts = ts && tpl.tsconfig({ project_type });

  // d.ts files
  const content_d = ts && tpl.source_d({ style });

  // test files
  const content_jest = testFrame === 'jest' && tpl.jest({ ts });

  // lint files
  const content_eslintrc = eslint && tpl.eslint({ project_type, ts });
  const content_eslintignore = eslint && tpl.eslintignore();
  const content_stylelint = stylelint && tpl.stylelint({ style });
  const content_commitlint = commitlint && tpl.commitlint({ name });

  // build files
  const content_babel = tpl.babel({ project_type, ts });

  // webpack config files
  const content_webpack_common = tpl.webpack_config_common({ ts, style, configFileName });
  const content_webpack_dev = tpl.webpack_config_dev({ project_type, name, style, ts });
  const content_webpack_prod = tpl.webpack_config_prod({ style, configFileName });

  // ReadMe
  const content_readMe = tpl.readme({ name, configFileName });

  const files = {
    [`${configFileName}`]: content_omni,
    'package.json': content_pkg,
    '.gitignore': content_gitignore,
    [`src/index.${ts ? 'tsx' : 'jsx'}`]: content_indexReactTpl,
    'src/index.html': content_indexHtml,
    'src/@types/global.d.ts': content_d,
    'configs/webpack.config.common.js': content_webpack_common,
    'configs/webpack.config.dev.js': content_webpack_dev,
    'configs/webpack.config.prod.js': content_webpack_prod,
    'tsconfig.json': content_ts,
    'jest.config.js': content_jest,
    '.eslintrc.js': content_eslintrc,
    '.eslintignore': content_eslintignore,
    'stylelint.config.js': content_stylelint,
    'commitlint.config.js': content_commitlint,
    'babel.config.js': content_babel,
    'README.md': content_readMe
  }
  /**
   * create files
   */
  const file_path = (p: string) => path.resolve(initPath, p);
  for (const p in files) {
    output_file({
      file_path: file_path(p),
      file_content: files[p]
    });
  }

  let installCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add --cwd ${initPath}` : `${pkgtool} install --save --prefix ${initPath}`;
  let installDevCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add -D --cwd ${initPath}` : `${pkgtool} install --save-dev --prefix ${initPath}`;
  if (pkgtool === 'cnpm' && initPath !== process.cwd()) {
    installCliPrefix = `cd ${initPath} && ${installCliPrefix}`;
    installDevCliPrefix = `cd ${initPath} && ${installDevCliPrefix}`;
  }

  let {
    depArr,
    depStr
  } = dependencies(strategy);
  let dependencies_str = depStr;
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom(depArr);
    if (result instanceof Array) {
      dependencies_str = `${depStr} ${arr2str(result)}`;
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        depArr = [ ...intersection(depArr, depArr.filter(v => v !== item_rm)) ];
      }
      dependencies_str = `${arr2str(depArr)} ${arr2str(add)}`;
    }
  }

  const installCli = dependencies_str ? `${installCliPrefix} ${dependencies_str}` : '';
  let {
    defaultDepArr,
    defaultDepStr,
    buildDepArr,
    buildDepStr,
    tsDepArr,
    tsDepStr,
    testDepStr,
    testDepArr,
    eslintDepArr,
    eslintDepStr,
    commitlintDepArr,
    commitlintDepStr,
    stylelintDepArr,
    stylelintDepStr,
    devServerDepArr,
    devServerDepStr,
    devDepArr
  } = devDependencies(strategy, {
    ts,
    eslint,
    commitlint,
    style,
    stylelint,
    test: !!testFrame,
    devServer
  });

  let customDepStr;
  if (typeof devDependencies_custom === 'function') {
    const result = devDependencies_custom(devDepArr);
    if (result instanceof Array) {
      customDepStr = arr2str(result);
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        defaultDepArr = [ ...intersection(defaultDepArr, defaultDepArr.filter(v => v !== item_rm)) ];
        buildDepArr = [ ...intersection(buildDepArr, buildDepArr.filter(v => v !== item_rm)) ];
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        stylelintDepArr = [ ...intersection(stylelintDepArr, stylelintDepArr.filter(v => v !== item_rm)) ];
        devServerDepArr = [ ...intersection(devServerDepArr, devServerDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      buildDepStr = arr2str(buildDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      stylelintDepStr = arr2str(stylelintDepArr);
      devServerDepStr = arr2str(devServerDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCli = defaultDepStr ? `${installDevCliPrefix} ${defaultDepStr}` : '';
  const installBuildDevCli = buildDepStr ? `${installDevCliPrefix} ${buildDepStr}` : '';
  const installTsDevCli = tsDepStr ? `${installDevCliPrefix} ${tsDepStr}` : '';
  const installTestDevCli = testDepStr ? `${installDevCliPrefix} ${testDepStr}` : '';
  const installEslintDevCli = eslintDepStr ? `${installDevCliPrefix} ${eslintDepStr}` : '';
  const installCommitlintDevCli = commitlintDepStr ? `${installDevCliPrefix} ${commitlintDepStr}` : '';
  const installStylelintDevCli = stylelintDepStr ? `${installDevCliPrefix} ${stylelintDepStr}` : '';
  const installServerDevCli = devServerDepStr ? `${installDevCliPrefix} ${devServerDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';

  exec([
    installCli,
    installDevCli,
    installBuildDevCli,
    installTsDevCli,
    installTestDevCli,
    installEslintDevCli,
    installCommitlintDevCli,
    installStylelintDevCli,
    installServerDevCli,
    installCustomDevCli
  ], success, error, isSlient);
}

export default init;