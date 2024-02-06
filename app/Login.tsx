import { useEffect } from 'react';
import { supabase } from './SupabaseConfig';
import { useApplication } from './ApplicationContext';

export default function Login() {
  const { user, session } = useApplication();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error);
      return;
    }

    console.log(data);
  };

  async function signInAndGetToken() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'your-email@example.com',
      password: 'your-password',
    });

    const { session } = data;

    if (error) {
      console.error('Error during sign in:', error);
      return;
    }

    if (session) {
      console.log('JWT Token:', session.access_token);
    }
  }

  useEffect(() => {
    console.log(user);
    console.log(session);
  }, [user, session]); // Run this effect when `user` or `session` changes

  const status = user != null ? "Logged in" : "Logged out";

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div>
        <span>Status: </span><span>{status}</span>
      </div>
      <button onClick={signInAndGetToken}>Login</button>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
