import { useState } from 'react';
import { useFetchArticlesQuery } from '../../Utils/articlesApi';

import { Pagination, Spin, Alert } from 'antd';

import Article from '../article';
import './articles-list.css';

const ArticlesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, error, isLoading } = useFetchArticlesQuery({ limit, offset: (currentPage - 1) * limit });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Spin tip="Загрузка..." />;
  if (error) return <Alert message="Ошибка при загрузке статей" type="error" />;

  return (
    <div className="articles-list">
      {data.articles.map((article, index) => (
        <Article key={`${article.slug}-${index}`} article={article} />
      ))}
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={data.articlesCount}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
    </div>
  );
};

export default ArticlesList;
