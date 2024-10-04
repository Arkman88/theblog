import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from '../../store/slices/userSlice';
import PrivateRoute from '../../store/privateRoute';

// components & pages
import ArticlesList from '../pages/articles-list';
import Header from '../header';
import Register from '../pages/register';
import Login from '../pages/login';
import Profile from '../pages/profile';
import NewArticle from '../pages/new-article';
import NotFound from '../pages/not-found';

import styles from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  const isAuthenticated = !!user;
  console.log('user is login: ', isAuthenticated);

  return (
    <div className={styles.app}>
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
