import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import StarRating from './components/StarRating';

function Test() {
  const [m, sM] = useState(0);
  return (
    <div>
      <StarRating onSetRating={sM} />
      <p>{m}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
