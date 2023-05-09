import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);

function Home() {
    return (<div style={{ minHeight: 'calc(100vh - 70px - 90px)', backgroundColor: '#170f23' }}>
        homes
    </div>);
}

export default Home;
