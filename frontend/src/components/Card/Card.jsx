import { Image, Card as CardAntd } from 'antd';
import oceanLand from '../../assets/oceanLand.png';
import styles from './Card.module.css';

function Cards(props) {
  const { children, style } = props;

  return (
    <CardAntd {...props} className={styles.card} bordered={false} hoverable={true} style={{ borderRadius: '15px' , position: 'relative', ...style }}>
      {children}
    </CardAntd>
  );
}

export default Cards;
