import { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(()=>{
    if(!localStorage.getItem('theme')){
      // console.log('tsisy theme')
      localStorage.setItem('theme','light')
    }else{
      // console.log('misy theme')
    }
  },[])
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
