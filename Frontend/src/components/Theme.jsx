import React from "react";
const ThemeContext = React.createContext({
  // Define default theme values here
  colors: {
    primary: '#007bff',
    secondary: '#ffc107',
    background: '#000',
    text: '#fd2e02',
  },
  fontSizes: {
    small: '14px',
    medium: '16px',
    large: '18px',
  },
  // Add more theme properties as needed
});

const ThemeProvider = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };