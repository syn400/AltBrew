import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import App from './App';
import { RecipeListPage } from './components/recipe-list-page/recipe-list-page';
import { SignUp } from './components/signup/signup'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<App />} />
      <Route path='/recipe-list' element={<RecipeListPage />} />
      <Route path='/register' element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
