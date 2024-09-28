import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../store/slices/userSlice';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className="header">
      <Link to={'/'}>
        <h2 className="blog">The blog!</h2>
      </Link>
      <div>
        {user ? (
          <div className="profile">
            <Link to="/new-article">
              <button className="button create-article">Create article</button>
            </Link>
            <Link to={'/profile'}>
              <p className="username">{user.username}</p>
            </Link>
            <Link to={'/profile'}>{user.image && <img src={user.image} alt="User image" className="image" />}</Link>
            <button className="button log-out" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to={'/sign-in'}>
              <button className="button">Sign In</button>
            </Link>
            <Link to={'/sign-up'}>
              <button className="button sign-up">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
