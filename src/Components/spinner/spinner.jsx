import { Spin } from 'antd';
import styles from './spinner.module.scss';

const Spinner = ({ tip = 'Loading...' }) => {
  return (
    <div className={styles.spinner}>
      <div className={styles['spinner-content']}>
        <Spin size="large" />
        <div className={styles['spinner-tip']}>{tip}</div>
      </div>
    </div>
  );
};

export default Spinner;
