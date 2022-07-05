import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import { ENGLISH } from './translations/en';
import reportWebVitals from './reportWebVitals';

import { ContextComponent } from './components/AppContext';
import Banner from './components/Banner';
import Details from './components/Details';
import Home from './components/Home';
import LocationInput from './components/LocationInput';

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: {
      en: {
        translation: ENGLISH,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextComponent>
    <Banner />
    <LocationInput />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </ContextComponent>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
