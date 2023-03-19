import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('main'));

root.render(

    <BrowserRouter>
       {/*  <StrictMode> */}
            <App />
       {/*  </StrictMode> */}
    </BrowserRouter>
);

reportWebVitals();
