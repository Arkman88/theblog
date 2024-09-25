import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to={'/'}>
        <h2 className="blog">The blog!</h2>
      </Link>
      <div>
        <Link to={'/sign-in'}>
          <button className="button">Sign In</button>
        </Link>
        <Link to={'/sign-up'}>
          <button className="button singup">Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
