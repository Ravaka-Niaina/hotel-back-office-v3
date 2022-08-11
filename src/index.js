// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// components
import Wrapper from './components/context/Wrapper';
// routes
import ThemeProvider from './theme';
// components
import ScrollToTop from './utils/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChartStyle';
import Router from './config/routes/routes';
// css
import './template/css/fonts.css'
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Wrapper>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Wrapper>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
