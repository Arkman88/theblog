import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser, checkAuthentication } from '../store/slices/userSlice';
import PrivateRoute from '../store/privateRoute';

// components & pages
import ArticlesList from '../Components/articles-list/articles-list';
import Header from '../Components/header';
import Register from '../Components/pages/register';
import Login from '../Components/pages/login';
import Profile from '../Components/pages/profile';
import NewArticle from '../Components/pages/new-article/new-article';
import NotFound from '../Components/pages/not-found/not-found';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(checkAuthentication());
  }, [dispatch]);

  const isAuthenticated = !!user;
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
