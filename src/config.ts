import routers from '@/app-routers';
import { LIGHT_THEME } from '@/utils/constant';
import { getAuthToken, getCurrentTheme } from '@/utils/helper';

const appConfiguration={
  appName: 'SmartDesk',
  appEnv: 'local',
  appVersion: '1.0.0',
  appLogo: '/static/images/logo/SmartDesk-logo.png',
  defaultTheme: LIGHT_THEME,
  currentTheme: getCurrentTheme(),
  auth: {
    authToken: getAuthToken(),
    isAuthenticated: Boolean(getAuthToken()),
    user: {},
    permission: []
  },
  appRouters:routers,
};
export default appConfiguration;