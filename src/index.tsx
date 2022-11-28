import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './main-page/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <script async
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k&libraries=places&callback=initMap">
    </script>
    <App />
  </React.StrictMode>
);
