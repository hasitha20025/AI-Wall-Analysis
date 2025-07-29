"use client";

import dynamic from 'next/dynamic';

// Dynamically import the SettingsDialog to prevent SSR hydration issues
const SettingsDialog = dynamic(() => import('./settings-dialog'), {
  ssr: false,
  loading: () => null
});

export default SettingsDialog;
