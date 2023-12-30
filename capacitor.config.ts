import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.datecalendar',
  appName: 'date-calendar',
  webDir: 'dist/date-calendar/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
