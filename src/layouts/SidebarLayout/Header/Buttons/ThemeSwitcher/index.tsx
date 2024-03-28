import {
  alpha,
  Badge,
  IconButton
} from '@mui/material';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '@/theme/ThemeProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { DARK_THEME, LIGHT_THEME } from '@/utils/constant';
import { useAppConfig } from '@/contexts/ApplicationConfigContext';


const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);


function ThemeSwitcher() {
  const { appConfig } = useAppConfig();
  const [mode, setMode] = useState<string>(appConfig.currentTheme);
  const setThemeName = useContext(ThemeContext);

  useEffect(() => {
    setThemeName(mode);
  }, [mode]);
  const colorMode = (e) => {
    setMode((prevMode) => (prevMode === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  }

  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={(e) =>colorMode(e)} color="inherit">
        {mode === DARK_THEME ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}

export default ThemeSwitcher;
