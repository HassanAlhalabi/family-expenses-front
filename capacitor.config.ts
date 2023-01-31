import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.family.app',
  appName: 'family',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.50:5173',
    cleartext: true
  }
};

export default config;
