import { Suspense, useState } from "react"
import 'simplebar/src/simplebar.css';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// components
import Wrapper from './components/context/Wrapper';
import ThemeProvider from './theme';

// css
import './assets/css/fonts.css'
import Test from "./Test";

const App = () => {
    const [lang, setLang] = useState("en")
    return (
        <Suspense fallback="Loading...">
            <Wrapper>
                <HelmetProvider>
                    <BrowserRouter>
                        <ThemeProvider>
                            <Test />
                        </ThemeProvider>
                    </BrowserRouter>
                </HelmetProvider>
            </Wrapper>
        </Suspense>
    )
}
export default App