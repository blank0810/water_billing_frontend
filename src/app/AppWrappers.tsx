'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';
import Loading from 'components/elements/loading';
import NoInternet from 'components/elements/no-internet';



export default function AppWrappers({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Listen for network changes
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus(); // initial check

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {isLoading && <Loading />}
      {!isOnline && <NoInternet />}
      {children}
    </ChakraProvider>
  );
}
