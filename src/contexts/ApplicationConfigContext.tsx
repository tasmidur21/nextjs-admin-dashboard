import { useState, ReactNode, createContext, useContext, useEffect } from 'react';
import appConfiguration from '@/config';
import { getAuthToken, getValueFromCookie, setCurrentTheme } from '@/utils/helper';

type IApplicationConfigContext = {
  appConfig: any;
  updateAppConfig: (config:any) => void;
};

export const ApplicationConfigContext = createContext<IApplicationConfigContext>(
  {} as IApplicationConfigContext
);

type Props = {
  children: ReactNode;
};

export function ApplicationConfigProvider({ children }: Props) {
  const [appConfig, _updateAppConfig] = useState<any>(appConfiguration);
  const updateAppConfig = (config:any):void => {
    if(config?.currentTheme){
      setCurrentTheme(config?.currentTheme)
    }
    _updateAppConfig((prevConfig)=>({
            ...prevConfig,
            ...config
     }));
  };

  useEffect(()=>{
    if(getAuthToken() && getValueFromCookie("_user")){
      updateAppConfig({
        auth:{
          authToken:getAuthToken(),
          user:getValueFromCookie('_user'),
          isAuthenticated:true
        }
      })
    }
  },[])

  return (
    <ApplicationConfigContext.Provider
      value={{ appConfig, updateAppConfig }}
    >
      {children}
    </ApplicationConfigContext.Provider>
  );
}

export const useAppConfig= () => useContext(ApplicationConfigContext);
