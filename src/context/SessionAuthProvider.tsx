"use client";

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const SessionContext = createContext(undefined);

export const SessionProvider = ({ children }: any) => {
  const [token, setToken] = useState(Cookies.get('token') || null);

  const login = (newToken: any) => {
    setToken(newToken);
    Cookies.set('token', newToken);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('token');
  };

  return (
    // @ts-ignore
    <SessionContext.Provider value={{ token, login, logout }}>
      <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

