import { STYLE } from '@omni-door/utils';

export default function (config: {
  ts: boolean;
  style: STYLE;
}) {
  const { ts, style } = config;
  const suffix = style && style === 'all' ? 'less' : style;

  return `${ts ? '///<reference types=\'webpack-env\' />' : ''}
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
${suffix ? `import styles from './index.${suffix}';
import './reset.${suffix}';` : ''}

const App = () => (
  <div className={${suffix ? 'styles.main' : "'main'"}}>
    It's Your Omni-SPA Project
    <span className={${suffix ? "styles['main-subtitle']" : "'main-subtitle'"}}>
      start your show
    </span>
    <footer className={${suffix ? "styles['main-footer']" : "'main-footer'"}}>
      OMNI-DOOR TEAM @omni-door
    </footer>
  </div>
);

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}`;
}