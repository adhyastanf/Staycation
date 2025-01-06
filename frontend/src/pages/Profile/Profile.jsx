import { lazy, Suspense, useEffect } from 'react';

import { Layout } from 'antd';
import useProfileStore from '../../store/profile-store';

const ProfileDetails = lazy(() => import('./ProfileDetails.jsx'));

const { Content } = Layout;



export default function Profile() {
  const { loadData, data, loading } = useProfileStore();

  useEffect(() => {
    if (!data) {
      loadData('data');
    }
  }, []);

  if (loading['data']) return <p>Loading...</p>;

  return (
    <Content>
      <Suspense fallback={<p>loading...</p>}>
        <ProfileDetails username={data.username} fullname={data.fullname} email={data.email} />
      </Suspense>
    </Content>
  );
}
