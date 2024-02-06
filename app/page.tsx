'use client'

import { ApplicationProvider } from './ApplicationContext';
import Login from './Login';
import './globals.css';

function MyApp({ }) {
  return (
    <ApplicationProvider>
      <Login />
    </ApplicationProvider>
  );
}

export default MyApp;