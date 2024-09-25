import { Route, Routes } from 'react-router-dom';
import ArticlesList from '../Components/articles-list/articles-list';
import Header from '../Components/header';
import Register from '../Components/register';
import Login from '../Components/login';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlesList />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
