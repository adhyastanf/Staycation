import { Skeleton, Card, Space, Layout } from 'antd';
import styles from './DetailHouse.module.css';

const { Content } = Layout;

function DetailHouseLoading() {
  return (
    <Content style={{ padding: '0 150px', marginTop: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 300, marginBottom: 32 }}>
        <Skeleton.Button active size='small' shape='round' style={{ width: 150 }} />
        <div>
          <div style={{ marginBottom: 10 }}>
            <Skeleton.Input active size='small' style={{ width: 150 }} />
          </div>
          <div>
            <Skeleton.Input active size='small' style={{ width: 120 }} />
          </div>
        </div>
      </div>

      <div className={styles.containerGrid}>
        <Skeleton.Image style={{ width: '100%', height: '500px' }} />
        <Skeleton.Image style={{ width: '100%', height: '245px' }} />
        <Skeleton.Image style={{ width: '100%', height: '245px' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 52 }}>
        <div style={{ width: 600 }}>
          <Space direction='vertical' size={10} style={{ marginBottom: 20 }}>
            <Skeleton.Input active size='default' style={{ width: 200, marginBottom: 8 }} />
            <Skeleton paragraph={{ rows: 4 }} active />
          </Space>

          <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px' }}>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} style={{ width: 100 }}>
                <Skeleton.Avatar active size='large' style={{ marginBottom: 10 }} />
                <Skeleton.Input active size='small' />
              </div>
            ))}
          </div>
        </div>

        <Card
          style={{
            width: 487,
            alignSelf: 'flex-start',
            padding: '62px 84px',
            boxSizing: 'border-box',
          }}
        >
          <Skeleton.Input active size='default' style={{ width: 200, marginBottom: 16 }} />
          <Skeleton.Input active size='large' style={{ width: 300, marginBottom: 16 }} />
          <Skeleton.Button active size='large' style={{ width: '100%', marginBottom: 16 }} />
          <Skeleton.Button active size='large' block />
        </Card>
      </div>
    </Content>
  );
}

export default DetailHouseLoading;
