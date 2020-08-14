import React, { useContext, lazy, Suspense } from 'react';
import './App.css';

import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDark, themeLight } from './utils/RootStyles';

import { ThemeContext } from './context/ThemeContext';
import { Header, Footer, Skeleton } from './components';

const Home = lazy(() => import('./Pages/Home/Home.component.jsx'));
const Overtime = lazy(() => import('./Pages/Overtime/Overtime.component.jsx'));

const App = () => {
  const { theme } = useContext(ThemeContext);
  const appliedTheme = createMuiTheme(theme.isDark ? themeDark : themeLight);

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className='App App__padding-vertical'>
        <div className='App__container'>
          <CssBaseline />
          <Header />
          <Suspense fallback={<Skeleton />}>
            <Router>
              <Home path='/' />
              <Overtime path='/overtime' />
            </Router>
          </Suspense>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
