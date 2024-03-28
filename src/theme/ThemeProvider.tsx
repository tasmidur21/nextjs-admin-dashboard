import { FC, useState, createContext, useEffect } from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { useAppConfig } from '@/contexts/ApplicationConfigContext';
export const ThemeContext = createContext((_themeName: string): void => { });
const ThemeProviderWrapper: FC = (props:any) => {
  const { appConfig,updateAppConfig } = useAppConfig();
  const [themeName, _setThemeName] = useState<string>(appConfig.currentTheme);
  const [theme, createTheme] = useState<Theme>(null)
  const setThemeName = (selectedThemeName: string): void => {
    _setThemeName(selectedThemeName);
    updateAppConfig({
      currentTheme:selectedThemeName
    })
  };
  useEffect(() => {
    createTheme(themeCreator(themeName));
  }, [themeName])
  return (
    <>
      {
        theme && <>
          <StylesProvider injectFirst>
            <ThemeContext.Provider value={setThemeName}>
              <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
            </ThemeContext.Provider>
          </StylesProvider>
        </>
      }
    </>
  );
};

export default ThemeProviderWrapper;
