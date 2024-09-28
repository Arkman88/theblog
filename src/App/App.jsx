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

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlesList />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<NewArticle />} />
      </Routes>
    </div>
  );
};

export default App;
