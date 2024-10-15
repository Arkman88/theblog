import { useEffect } from 'react';
import { useGetArticleQuery } from '../../../store/articlesApi';
import Spinner from '../../spinner/spinner';
import { Alert } from 'antd';
import { useParams } from 'react-router-dom';
import Article from '../article';
import styles from './article-page.module.scss';

const ArticlePage = () => {
  const { slug } = useParams();
  const { data, error, isLoading, refetch } = useGetArticleQuery(slug);

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug, refetch]);

  if (isLoading) return <Spinner />;
  if (error) return <Alert message="Ошибка при загрузке статьи" type="error" />;

  return (
    <div className={styles['article-page']}>
      {data ? (
        <Article key={data.article.slug} article={data.article} isDetailPage={true} />
      ) : (
        <Alert message="Статья не найдена" type="error" />
      )}
    </div>
  );
};

export default ArticlePage;
