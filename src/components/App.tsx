import "./App.css";
import Background from "components/Background";
import AppContainer from "components/AppContainer";
import useDisclaimerToast from "./useDisclaimerToast";
import { useState, createContext } from "react";

enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeContext = createContext<Nullable<string>>(null);

function App() {
  const [theme, setTheme] = useState(ThemeMode.DARK);

  const handleChangeTheme = () => {
    theme === ThemeMode.LIGHT
      ? setTheme(ThemeMode.DARK)
      : setTheme(ThemeMode.LIGHT);
  };

  useDisclaimerToast();

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Background />
        <AppContainer handleChangeTheme={handleChangeTheme} />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
