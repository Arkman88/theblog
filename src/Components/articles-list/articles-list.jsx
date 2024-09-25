import { useState } from 'react';
import { useFetchArticlesQuery } from '../../Utils/articlesApi';
import Spinner from '../spinner/spinner';
import { useParams } from 'react-router-dom';

import { Pagination, Alert } from 'antd';

import Article from '../article';
import './articles-list.css';

const ArticlesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, error, isLoading } = useFetchArticlesQuery({ limit, offset: (currentPage - 1) * limit });
  const { slug } = useParams();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert message="Ошибка при загрузке статей" type="error" />;

  const article = slug ? data.articles.find((article) => article.slug === slug) : null;

  return (
    <div className="articles-list">
      {article ? (
        <Article key={article.slug} article={article} isDetailPage={true} />
      ) : (
        <>
          {data.articles.map((article) => (
            <Article key={article.slug} article={article} isDetailPage={false} />
          ))}
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={data.articlesCount}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: 20, textAlign: 'center' }}
          />
        </>
      )}
    </div>
  );
};

export default ArticlesList;
