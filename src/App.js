import { Suspense } from 'react';
import 'simplebar/src/simplebar.css';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// components
import Wrapper from './components/context/Wrapper';
import ThemeProvider from './theme';

import ScrollToTop from './utils/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChartStyle';
import Router from './config/routes/routes';
// css
import Preloader from './components/Preloader/Preloader';
import './assets/css/fonts.css';
import IdleTimer from './services/IdleTimer';

const App = () => (
  <Suspense 
    fallback={(<Preloader />)}
  >
    <Wrapper>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <BaseOptionChartStyle />
            <IdleTimer>
              <Router />
            </IdleTimer>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Wrapper>
  </Suspense>
);
export default App;
