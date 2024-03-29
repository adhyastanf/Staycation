import { Button, Input, Space } from 'antd';
import styles from './Counter.module.css';

function Counter(props) {
  const { minValue, maxValue, value, increment, decrement } = props;

  function incrementCounter() {
    if (maxValue) {
      increment();
    }
  }
  function decrementCounter() {
    if (minValue) {
      decrement();
    }
  }

  const buttonMinus = (
    <Button type='primary' onClick={() => decrementCounter()}>
      -
    </Button>
  );
  const buttonPlus = (
    <Button type='primary' onClick={() => incrementCounter()}>
      +
    </Button>
  );

  return (
    <Space className={styles.containerInput}>
      <Space.Compact>
        {buttonMinus}
        <Input defaultValue={0} value={value} />
        {buttonPlus}
      </Space.Compact>
    </Space>
  );
}

export default Counter;
