import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { GlobalProvider } from './context/ThemeContext';

render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
