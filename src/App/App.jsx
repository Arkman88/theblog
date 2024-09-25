import { Route, Routes } from 'react-router-dom';
import ArticlesList from '../Components/articles-list/articles-list';
import Header from '../Components/header/header';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticlesList />} />
      </Routes>
    </div>
  );
};

export default App;
