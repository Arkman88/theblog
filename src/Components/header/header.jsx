import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h2>The blog!</h2>
      <div>
        <button className="button">Sing In</button>
        <button className="button singup">Sing Up</button>
      </div>
    </header>
  );
};

export default Header;
