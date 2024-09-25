import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to={'/'}>
        <h2 className="blog">The blog!</h2>
      </Link>
      <div>
        <button className="button">Sing In</button>
        <button className="button singup">Sing Up</button>
      </div>
    </header>
  );
};

export default Header;
