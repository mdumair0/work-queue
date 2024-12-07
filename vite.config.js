import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.APIKEY': JSON.stringify(process.env.VITE_SERVERS_URL), // Use process.env directly
  },
});
