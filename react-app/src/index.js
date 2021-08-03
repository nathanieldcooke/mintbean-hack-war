import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FadeProvider } from './components/FadeContext';


ReactDOM.render(
  <React.StrictMode>
        <FadeProvider>
          <App />
        </FadeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
