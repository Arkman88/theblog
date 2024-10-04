import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../store/slices/userSlice';
import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <h2 className={styles.blog}>The blog!</h2>
      </Link>
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
