import React, { useReducer, createContext } from 'react';
import storage from 'local-storage-fallback';

export const ThemeContext = createContext({});

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

const reducer = (state, action) => {
  if (action.type === TOGGLE_DARK_MODE) {
    storage.setItem('isDark', !state.isDark);
    return { isDark: !state.isDark };
  }

  return state;
};

export const GlobalProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(reducer, {
    isDark: storage.getItem('isDark')
      ? JSON.parse(storage.getItem('isDark'))
      : false,
  });

  const toggleDarkMode = () => {
    dispatch({
      type: TOGGLE_DARK_MODE,
    });
  };

  const value = { theme, toggleDarkMode };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
