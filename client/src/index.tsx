import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './react/components/App/App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';

// ReactDOM Root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// ReactQuery client
export const queryClient = new QueryClient();

// Render
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
