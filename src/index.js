/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from './containers/App/App';
import createStore from './createStore';
// import * as serviceWorker from './serviceWorker';
import './assets/css/normalize.css';
import './assets/css/fonts.css';
import './assets/css/main.css';
import './assets/css/var.css';

// const initStore = {};
const store = createStore;
const persistor = persistStore(store);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#242a37',
      dark: '#0066ff',
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#ff6b08',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    background: {
      default: '#f5f7fa',
    },
    action: {
      active: '#ff6b08',
      hover: '#ff6b08',
      hoverOpacity: 0.08,
      selected: '#ff6b08',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    // error: will use the default color
  },
  typography: {
    button: {
      fontFamily: 'Montserrat',
      fontSize: '13px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.23,
      letterSpacing: '0.39px',
      textAlign: 'center',
      color: 'var(--dark)',
      textTransform: 'initial',
    },
  },
});

// eslint-disable-next-line no-unused-vars
const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>{' '}
        </ThemeProvider>{' '}
      </PersistGate>{' '}
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./containers/App/App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
