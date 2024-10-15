import { Card, Col, Row, Avatar, Tag, Popconfirm, message } from 'antd';
import heart from '../../../images/heart-empty.svg';
import heartFilled from '../../../images/heart-full.svg';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useLikeArticleMutation, useDeleteArticleMutation, useFetchArticlesQuery } from '../../../store/articlesApi';
import { useState } from 'react';

import styles from './article.module.scss';

const Article = ({ article, isDetailPage }) => {
  const latestDate = new Date(article.updatedAt) > new Date(article.createdAt) ? article.updatedAt : article.createdAt;
  const { user } = useSelector((state) => state.user);
  const token = user?.token;
  const isLoggedIn = Boolean(token);
  const navigate = useNavigate();
  const { refetch: refetchArticles } = useFetchArticlesQuery({ limit: 5, offset: 0 });

  const isAuthor = user?.username === article.author.username;

  const [likeArticle] = useLikeArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert('Please log in to like articles!');
      return;
    }

    try {
      if (liked) {
        await likeArticle({ slug: article.slug, method: 'DELETE' }).unwrap();
        setFavoritesCount(favoritesCount - 1);
      } else {
        await likeArticle({ slug: article.slug, method: 'POST' }).unwrap();
        setFavoritesCount(favoritesCount + 1);
      }
      setLiked(!liked);
      console.log('Article like toggled successfully!');
    } catch (error) {
      console.error('Error toggling article like:', error);
      alert('Failed to toggle like on the article.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(article.slug).unwrap();
      message.success('Article deleted successfully');

      await refetchArticles();
      navigate('/articles');
    } catch (error) {
      message.error('Failed to delete article');
      console.error('Error deleting article:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };

  return (
    <Col span={24} key={article.slug}>
      <Card className={styles['article-card']} bordered={false}>
        <Row>
          <Col span={16}>
            <div className={styles['article-header']}>
              <Link to={`/articles/${article.slug}`}>
                <p className={styles['article-title']}>{article.title}</p>
              </Link>
              <img
                onClick={isLoggedIn ? handleLike : null}
                src={liked ? heartFilled : heart}
                alt="likes"
                className={styles.like}
                style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed', opacity: isLoggedIn ? 1 : 0.5 }}
              />
              <span className={styles['like-num']}>{favoritesCount}</span>
            </div>
            <div className={styles['article-tags']}>
              {article.tagList &&
                article.tagList.length > 0 &&
                article.tagList
                  .filter((tag) => tag.trim() !== '')
                  .map((tag, index) => <Tag key={`${tag}-${index}`}>{tag}</Tag>)}
            </div>
            {isDetailPage ? (
              <>
                <p>{article.description}</p>
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </>
            ) : (
              <p className={styles['article-description']}>{article.description}</p>
            )}
          </Col>

          <Col span={8}>
            <div className={styles['article-user']}>
              <div>
                <p className={styles['user-name']}>{article.author.username}</p>
                <p className={styles.date}>{format(new Date(latestDate), 'MMMM d, yyyy')}</p>
                {isDetailPage && isAuthor && (
                  <div className={styles.buttons}>
                    <button onClick={handleEdit} className={styles.edit}>
                      Edit
                    </button>
                    <Popconfirm
                      title="Are you sure you want to delete this article?"
                      onConfirm={handleDelete}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button type="button" className={styles.delete}>
                        Delete
                      </button>
                    </Popconfirm>
                  </div>
                )}
              </div>
              <Avatar size={64} src={article.author.image} alt={article.author.username} />
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default Article;
