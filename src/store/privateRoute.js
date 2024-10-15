import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import { useGetArticleQuery } from './articlesApi';
import { useParams } from 'react-router-dom';
import Spinner from '../Components/spinner/spinner';

const PrivateRoute = ({ children, isAuthenticated, user }) => {
  const { slug } = useParams();
  const { data: articleData, isLoading } = useGetArticleQuery(slug, {
    skip: !slug,
  });

  const isAuthor = articleData?.article.author.username === user?.username;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      message.warning('You need to be logged in to access this page.');
    } else if (isAuthenticated && articleData && !isAuthor) {
      message.error('You do not have permission to edit this article.');
    }
  }, [isAuthenticated, isAuthor, articleData, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (articleData && !isAuthor) {
    return <Navigate to="/articles" />;
  }

  return children;
};

export default PrivateRoute;
