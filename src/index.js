import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { RecipeListPage } from './components/recipe-list-page/recipe-list-page';
import { SignUp } from './components/signup/signup'
import { Homepage } from './components/homepage/homepage'
import { AuthProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/recipe-list' element={<RecipeListPage />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
