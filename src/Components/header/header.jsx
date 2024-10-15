import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../store/slices/userSlice';
import styles from './header.module.scss';
import { useFetchArticlesQuery } from '../../store/articlesApi';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { refetch: refetchArticles, isFetching } = useFetchArticlesQuery({ limit: 5, offset: 0 });

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const handleArticlesList = async () => {
    await refetchArticles();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.homebtn}
        disabled={isFetching}
        onClick={handleArticlesList}
        style={{ cursor: isFetching ? 'not-allowed' : 'pointer' }}
      >
        <h2 className={styles.blog}>The blog!</h2>
      </button>
      <div>
        {user ? (
          <div className={styles.profile}>
            <Link to="/new-article">
              <button className={`${styles['button']} ${styles['create-article']}`}>Create article</button>
            </Link>
            <Link to={'/profile'}>
              <p className={styles.username}>{user.username}</p>
            </Link>
            <Link to={'/profile'}>
              {user.image && <img src={user.image} alt="User image" className={styles.image} />}
            </Link>
            <button className={`${styles['button']} ${styles['log-out']}`} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to={'/sign-in'}>
              <button className={styles.button}>Sign In</button>
            </Link>
            <Link to={'/sign-up'}>
              <button className={`${styles['button']} ${styles['sign-up']}`}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
