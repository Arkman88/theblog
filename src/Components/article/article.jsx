import { Card, Col, Row, Avatar, Tag } from 'antd';
import heart from '../../images/heart.svg';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './article.css';

const Article = ({ article, isDetailPage }) => {
  const latestDate = new Date(article.updatedAt) > new Date(article.createdAt) ? article.updatedAt : article.createdAt;

  return (
    <Col span={24} key={article.slug}>
      <Card className="article-card" bordered={false}>
        <Row>
          <Col span={16}>
            <div className="article-header">
              <Link to={`/articles/${article.slug}`}>
                <p className="article-title">{article.title}</p>
              </Link>
              <button disabled className="like">
                <img src={heart} alt="likes" /> {article.favoritesCount}
              </button>
            </div>
            <div>
              {article.tagList.map((tag, index) => (
                <Tag key={`${tag}-${index}`}>{tag}</Tag>
              ))}
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
