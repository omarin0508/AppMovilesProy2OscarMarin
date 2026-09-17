import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { AppInfo } from '../types/app';

interface AppContextValue {
  appInfo: AppInfo;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const appInfo = useMemo<AppInfo>(
    () => ({
      course: 'Programacion para Dispositivos Moviles',
      projectName: 'Explorador de Datos y Consumo de APIs',
      phase: 'baseline',
    }),
    [],
  );

  return <AppContext.Provider value={{ appInfo }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
