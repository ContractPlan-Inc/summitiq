import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DemoContextType {
  isDemoMode: boolean;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
}

const DemoContext = createContext<DemoContextType>({
  isDemoMode: false,
  enterDemoMode: () => {},
  exitDemoMode: () => {},
});

export const useDemoMode = () => useContext(DemoContext);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check for demo mode in localStorage on mount (SSR-safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const demoMode = localStorage.getItem('summitiq_demo_mode');
      if (demoMode === 'true') {
        setIsDemoMode(true);
      }
    }
  }, []);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('summitiq_demo_mode', 'true');
    }
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('summitiq_demo_mode');
    }
  };

  return (
    <DemoContext.Provider value={{ isDemoMode, enterDemoMode, exitDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
}
