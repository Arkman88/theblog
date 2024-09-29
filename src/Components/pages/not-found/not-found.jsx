import { Link } from 'react-router-dom';
import notFoundImg from '../../../images/404.jpg';

import './not-found.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <img className="not-found-image" src={notFoundImg} alt="Страница не найдена" />
      <Link to="/">
        <button className="button to-main-button">To main page</button>
      </Link>
    </div>
  );
};

export default NotFound;
