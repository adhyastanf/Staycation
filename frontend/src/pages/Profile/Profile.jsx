import { useEffect } from 'react';

import { Layout, Skeleton } from 'antd';
import useProfileStore from '../../store/profile-store';
import ProfileDetails from './ProfileDetails';
import LoadingProfle from '../../components/Loading/LoadingProfile/LoadingProfile';

const { Content } = Layout;

export default function Profile() {
  const { loadData, data, loading } = useProfileStore();

  useEffect(() => {
    if (!data) {
      loadData('data');
    }
  }, []);

  if (loading['data']) return <LoadingProfle />;

  return (
    <Content style={{ height: '100vh' }}>
      <ProfileDetails username={data.username} fullname={data.fullname} email={data.email} />
    </Content>
  );
}
