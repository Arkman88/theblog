import { Link } from 'react-router-dom';
import notFoundImg from '../../../images/404.jpg';

import styles from './not-found.module.scss';

const NotFound = () => {
  return (
    <div className={styles['not-found']}>
      <img className={styles['not-found-image']} src={notFoundImg} alt="Page not found" />
      <Link to="/">
        <button className={`${styles.button} ${styles['to-main-button']}`}>To main page</button>
      </Link>
    </div>
  );
};

export default NotFound;
