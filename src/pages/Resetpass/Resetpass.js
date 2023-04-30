import classNames from 'classnames/bind';
import styles from './Resetpass.module.scss';
//component
const cx = classNames.bind(styles);
function Resetpass() {
    return <div className={cx('wrapper')}>reset pass</div>;
}

export default Resetpass;
