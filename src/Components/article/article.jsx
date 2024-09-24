import { Card, Col, Row, Avatar, Tag } from 'antd';
import heart from '../../images/heart.svg';
import { format } from 'date-fns';

import './article.css';

const Article = ({ article }) => {
  const latestDate = new Date(article.updatedAt) > new Date(article.createdAt) ? article.updatedAt : article.createdAt;

  return (
    <Col span={24} key={article.slug}>
      <Card className="article-card" bordered={false}>
        <Row>
          <Col span={16}>
            <div className="article-header">
              <h2 className="article-title">{article.title}</h2>
              <button disabled>
                <img src={heart} alt="likes" /> {article.favoritesCount}
              </button>
            </div>

            <p>{article.description}</p>
            <p className="article-body">{article.body}</p>

            <div>
              {article.tagList.map((tag, index) => (
                <Tag key={`${tag}-${index}`}>{tag}</Tag>
              ))}
            </div>
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
