import { Flex, Layout, Tabs } from 'antd';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardOrderList from '../../components/CardOrderList/CardOrderList';
import EmptyData from '../../components/EmptyComponent/EmptyData';

import useTransactionStore from '../../store/transaction';

const { Content } = Layout;

export default function OrderList() {
  const { loadData, data, loading } = useTransactionStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const paramStatus = searchParams.get('status') || 'all';

  const dataTransaction = (type) => data[type];
  const loadingTransanction = (type) => loading[type];

  const queryStatus = {
    1: null,
    2: 'pending',
    3: 'paid',
    4: 'canceled',
  };

  const defaultTabsKey = {
    all: '1',
    pending: '2',
    paid: '3',
    canceled: '4',
  };

  const isValidStatus = Object.keys(defaultTabsKey).includes(paramStatus);

  const items = [
    {
      key: '1',
      label: 'All',
      children: <CardOrderList data={dataTransaction('all')} loading={loadingTransanction('all')} />,
    },
    {
      key: '2',
      label: 'Waiting',
      children: <CardOrderList data={dataTransaction('pending')} loading={loadingTransanction('pending')} />,
    },
    {
      key: '3',
      label: 'Finish',
      children: <CardOrderList data={dataTransaction('paid')} loading={loadingTransanction('paid')} />,
    },
    {
      key: '4',
      label: 'Cancel',
      children: <CardOrderList data={dataTransaction('canceled')} loading={loadingTransanction('canceled')} />,
    },
  ];

  const onChange = (key) => {
    const status = queryStatus[key];
    if (!status) {
      searchParams.delete('status');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ status });
    }
  };

  useEffect(() => {
    if (!data[paramStatus]) {
      loadData(paramStatus);
    }
  }, [paramStatus]);

  return (
    <Content>
      <Tabs activeKey={defaultTabsKey[paramStatus] || '0'} items={items} onChange={onChange} />
      {!isValidStatus && (
        <Flex justify='center' style={{ flexDirection: 'column', height: '600px' }}>
          <EmptyData />
        </Flex>
      )}
    </Content>
  );
}
