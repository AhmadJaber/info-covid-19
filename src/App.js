import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { themeDark, themeLight } from './utils/RootStyles';

import styles from './App.module.css';
import { ThemeContext } from './context/ThemeContext';
import Header from './components/Header/Header.component.jsx';
import Home from './Pages/Home/Home.component.jsx';
import Footer from './components/Footer/Footer.component.jsx';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const appliedTheme = createMuiTheme(theme.isDark ? themeDark : themeLight);

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={styles.paddingVertical}>
        <div className={styles.container}>
          <CssBaseline />
          <Header />
          <Home />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
