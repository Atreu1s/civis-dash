import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 

async function enableMocking() {
  // if (import.meta.env.MODE !== 'development') return;

  if (import.meta.env.MODE !== 'test') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  const { worker } = await import('./mocks/browser');
  
  return worker.start({
    onUnhandledRequest: 'bypass', 
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});