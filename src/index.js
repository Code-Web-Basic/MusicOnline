import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// redux
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from '~/App';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import ThemeProvider from './theme';
// import { StyledChart } from './layout/components/Publisher/chart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <ThemeProvider>
                    {/* <StyledChart /> */}

                    <App />
                </ThemeProvider>
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);
reportWebVitals();
