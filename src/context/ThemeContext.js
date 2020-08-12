import React, { useReducer, createContext } from 'react';

export const ThemeContext = createContext({});

const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

const reducer = (state, action) => {
  if (action.type === TOGGLE_DARK_MODE) {
    return { isDark: !state.isDark };
  }

  return state;
};

export const GlobalProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(reducer, { isDark: false });

  const toggleDarkMode = () => {
    dispatch({
      type: TOGGLE_DARK_MODE,
    });
  };

  console.log(theme);
  const value = { theme, toggleDarkMode };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
