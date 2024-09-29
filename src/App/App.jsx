import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUser } from '../store/slices/userSlice';

import ArticlesList from '../Components/articles-list/articles-list';
import Header from '../Components/header';
import Register from '../Components/pages/register';
import Login from '../Components/pages/login';
import Profile from '../Components/pages/profile';
import NewArticle from '../Components/pages/new-article/new-article';
import NotFound from '../Components/pages/not-found/not-found';

import PrivateRoute from '../Utils/privateRoute';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const isAuthenticated = !!localStorage.getItem('token');
  console.log(isAuthenticated);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlesList />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <NewArticle />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
