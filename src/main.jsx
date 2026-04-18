import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.jsx';
import './index.css';

// minimal — avoid wrapping providers here
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient) {
      console.log('Client hydrated');
    }
  }
);