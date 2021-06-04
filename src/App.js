import React, { useContext, lazy, Suspense } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDark, themeLight } from './utils/RootStyles';

import { ThemeContext } from './context/ThemeContext';
import { Header, Skeleton } from './components';

const Home = lazy(() => import('./Pages/Home/Home.component.jsx'));
const Overtime = lazy(() => import('./Pages/Overtime/Overtime.component.jsx'));

const App = () => {
  const { theme } = useContext(ThemeContext);
  const appliedTheme = createMuiTheme(theme.isDark ? themeDark : themeLight);

  return (
    <Router>
      <ThemeProvider theme={appliedTheme}>
        <div className="App App__padding-vertical">
          <div className="App__container">
            <CssBaseline />
            <Header />

            <Suspense fallback={<Skeleton />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/overtime" component={Overtime} />
              </Switch>
            </Suspense>
            {/* <Footer /> */}
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
