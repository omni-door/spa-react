import { PROJECT_TYPE, STRATEGY } from '@omni-door/utils';

export default (config: {
  project_type: PROJECT_TYPE;
  name: string;
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  stylelint: boolean;
  strategy: STRATEGY;
  type_react?: string;
}) => {
  const { name, ts, test, eslint, prettier, commitlint, stylelint, strategy, type_react } = config;
  const script_eslint = eslint && 'npm run lint:es';
  const script_stylelint = stylelint && 'npm run lint:style';
  const script_prettier = prettier && 'npm run lint:prettier';

  const script_eslint_fix = eslint && 'npm run lint:es_fix';
  const script_stylelint_fix = stylelint && 'npm run lint:style_fix';
  const script_prettier_fix = prettier && 'npm run lint:prettier_fix';

  const script_lint = `${script_prettier ? `${script_prettier}${script_eslint || script_stylelint ? ' && ' : ''}` : ''}${script_eslint ? `${script_eslint}${script_stylelint ? ' && ' : ''}` : ''}${script_stylelint ? `${script_stylelint}` : ''}`.trim();
  const script_lint_fix = `${script_prettier_fix ? `${script_prettier_fix}${script_eslint_fix || script_stylelint_fix ? ' && ' : ''}` : ''}${script_eslint_fix ? `${script_eslint_fix}${script_stylelint_fix ? ' && ' : ''}` : ''}${script_stylelint_fix ? `${script_stylelint_fix}` : ''}`.trim();

  const lowerName = name.toLowerCase();
  return `{
  "name": "${lowerName}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    ${
      test
        ? `"test": "jest --passWithNoTests",
        "test:snapshot": "jest --updateSnapshot",`
        : ''
    }
    ${
      script_lint
        ? `"lint": "${script_lint}",
          "lint:fix": "${script_lint_fix}",
          ${eslint ? `"lint:es": "eslint src/ --ext .${ts ? 'ts' : 'js'} --ext .${ts ? 'tsx' : 'jsx'}",
          "lint:es_fix": "eslint src/ --ext .${ts ? 'ts' : 'js'} --ext .${ts ? 'tsx' : 'jsx'} --fix",` : ''}
          ${prettier ? `"lint:prettier": "prettier --check src/",
          "lint:prettier_fix": "prettier --write src/",` : ''}
          ${stylelint ? `"lint:style": "stylelint src/**/*.{css,less,scss,sass} --allow-empty-input",
          "lint:style_fix": "stylelint src/**/*.{css,less,scss,sass} --fix --allow-empty-input",` : ''}`
      : ''
    }
    ${
      commitlint
        ? '"lint:commit": "commitlint -e $HUSKY_GIT_PARAMS",'
        : ''
    }
    "new": "omni new",
    "build": "omni build",
    "release": "omni release"
  },
  ${
    commitlint
      ? `"husky": {
          "hooks": {
            "pre-commit": "lint-staged",
            "pre-push": ${
              (eslint || stylelint || prettier) && test
                ? '"npm run lint && npm run test"'
                : (eslint || stylelint || prettier)
                    ? '"npm run lint"'
                    : test
                      ? '"npm run test"'
                      : ''},
            "commit-msg": "npm run lint:commit"
          }
        },
        "lint-staged": {
          ${eslint ? `"src/**/*.{js,jsx,ts,tsx}": [
            "${script_eslint_fix}"${prettier ? `,
            "${script_prettier_fix}"` : ''}
          ]${eslint && stylelint ? ',' : ''}` : ''}
          ${stylelint ? `"src/**/*.{css,scss,sass,less}": [
            "${script_stylelint_fix}"${prettier ? `,
            "${script_prettier_fix}"` : ''}
          ]` : ''}
        },`
      : ''
  }
  "keywords": [],
  "author": "",
  ${
    type_react && ts && strategy === 'stable'
      ? `"resolutions": {
        "@types/react": "${type_react}"
      },`
      : ''
  }
  "license": "ISC"
}`;
};

