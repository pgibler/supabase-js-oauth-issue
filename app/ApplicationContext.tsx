// ApplicationProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './SupabaseConfig';

const ApplicationContext = createContext<{
  session: Session | null,
  user: User | null,
  setSession: (session: Session | null) => void,
  setUser: (user: User | null) => void,
}>({
  session: null,
  user: null,
  setSession: () => { },
  setUser: () => { },
});

export const ApplicationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      console.log('Auth state changed:', event);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <ApplicationContext.Provider value={{ session, setSession, user, setUser }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
