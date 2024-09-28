import { Card, Col, Row, Avatar, Tag } from 'antd';
import heart from '../../../images/heart-empty.svg';
import heartFilled from '../../../images/heart-full.svg';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useLikeArticleMutation } from '../../../Utils/articlesApi';
import { useState } from 'react';
import './article.css';

const Article = ({ article, isDetailPage }) => {
  const latestDate = new Date(article.updatedAt) > new Date(article.createdAt) ? article.updatedAt : article.createdAt;

  const { user } = useSelector((state) => state.user);

  const token = user?.token;

  const isLoggedIn = Boolean(token);

  const [likeArticle] = useLikeArticleMutation();
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
        console.log(article.slug);
        setFavoritesCount(favoritesCount - 1);
      } else {
        await likeArticle({ slug: article.slug, method: 'POST' }).unwrap();
        console.log(article.slug);

        setFavoritesCount(favoritesCount + 1);
      }
      setLiked(!liked);
      console.log('Article like toggled successfully!');
    } catch (error) {
      console.error('Error toggling article like:', error);
      alert('Failed to toggle like on the article.');
    }
  };

  return (
    <Col span={24} key={article.slug}>
      <Card className="article-card" bordered={false}>
        <Row>
          <Col span={16}>
            <div className="article-header">
              <Link to={`/articles/${article.slug}`}>
                <p className="article-title">{article.title}</p>
              </Link>
              <img
                onClick={isLoggedIn ? handleLike : null}
                src={liked ? heartFilled : heart}
                alt="likes"
                className="like"
                style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed', opacity: isLoggedIn ? 1 : 0.5 }}
              />
              <span className="like-num">{favoritesCount}</span>
            </div>
            <div>
              {article.tagList &&
                article.tagList.length > 0 &&
                article.tagList.map((tag, index) => <Tag key={`${tag}-${index}`}>{tag}</Tag>)}
            </div>
            {isDetailPage ? (
              <>
                <p>{article.description}</p>
                <ReactMarkdown>{article.body}</ReactMarkdown>
              </>
            ) : (
              <p>{article.description}</p>
            )}
          </Col>

          <Col span={8}>
            <div className="article-user">
              <div>
                <p className="user-name">{article.author.username}</p>
                <p className="date">{format(new Date(latestDate), 'MMMM d, yyyy')}</p>
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
