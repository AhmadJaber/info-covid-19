import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import styles from './App.module.css';
import Home from './Pages/Home/Home.component.jsx';

const THEME = createMuiTheme({
  typography: {
    fontFamily: ['Work Sans', 'Roboto'],
  },
});

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <div className={styles.paddingVertical}>
          <div className={styles.container}>
            <Home />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
