// Core packages
import { LazyMotion, domAnimation } from 'framer-motion';

import Layout from '../components/layout/layout';

import '../node_modules/the-new-css-reset/css/reset.css';

import '@fontsource/fira-code/400.css';
import '@fontsource/fira-code/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

import '../node_modules/devicon/devicon.min.css';

// Global css
import '../styles/css/variables.css';
import '../styles/css/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LazyMotion>
    </>
  );
}
