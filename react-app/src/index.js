import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { FadeProvider } from './components/FadeContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <FadeProvider>
          <App />
        </FadeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
