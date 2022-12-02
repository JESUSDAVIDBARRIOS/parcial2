import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from "react-intl";
import 'bootstrap/dist/css/bootstrap.min.css';

import messages_en from "./translations/en.json";
import messages_es from "./translations/es.json";

const language = navigator.language.split(/[-_]/)[0];

const messages = {
  'en': messages_en,
  'es': messages_es
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language} messages={messages[language]}>
      <App language={language} />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
