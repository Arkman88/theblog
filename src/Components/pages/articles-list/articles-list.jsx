import { useState } from 'react';
import { useFetchArticlesQuery } from '../../../store/articlesApi';
import Spinner from '../../spinner/spinner';
import { Pagination, Alert } from 'antd';
import Article from '../article';
import styles from './articles-list.module.scss';

const ArticlesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const { data, error, isLoading, isFetching } = useFetchArticlesQuery({ limit, offset: (currentPage - 1) * limit });

  const handlePageChange = (page) => {
    if (!isLoading && !isFetching) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert message="Ошибка при загрузке статей" type="error" />;

  return (
    <div className={styles['articles-list']}>
      {data.articles.map((article) => (
        <Article key={article.slug} article={article} isDetailPage={false} />
      ))}
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={data.articlesCount}
        onChange={handlePageChange}
        showSizeChanger={false}
        disabled={isFetching}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
    </div>
  );
};

export default ArticlesList;
