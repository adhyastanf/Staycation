import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, Form, Layout, Modal, Typography } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/Input/Input';
import useProfileStore from '../../store/profile-store';
import { updateSchema } from '../../utils/schema';

const { Content } = Layout;

const { Title, Text, Paragraph } = Typography;

export default function ProfileDetails({ username, fullname, email }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const { updateUser, data, loading } = useProfileStore();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  const showModal = (field) => {
    setIsModalOpen(true);
    setEditField(field);
    reset({ value: data[field] });
  };

  const onSubmit = async (val) => {
    const body = { [editField]: val.value };
    await updateUser(body, 'update');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Content>
      <Title level={4}>Ubah Biodata Diri</Title>
      <Content>
        <Flex>
          <Paragraph style={{ width: 100 }}>Username</Paragraph>
          <Paragraph style={{ width: 200 }}>{username}</Paragraph>
          <Button onClick={() => showModal('username')} size='small'>
            Change
          </Button>
        </Flex>
        <Flex>
          <Paragraph style={{ width: 100 }}>Fullname</Paragraph>
          <Paragraph style={{ width: 200 }}>{fullname}</Paragraph>
          <Button onClick={() => showModal('fullname')} size='small'>
            Change
          </Button>
        </Flex>
      </Content>
      <Title level={4}>Ubah Kontak</Title>
      <Content>
        <Flex>
          <Paragraph style={{ width: 100 }}>Email</Paragraph>
          <Paragraph style={{ width: 200 }}>{email}</Paragraph>
          <Button onClick={() => showModal('email')} size='small'>
            Change
          </Button>
        </Flex>
      </Content>
      <Modal title='Ubah Nama' open={isModalOpen} closable={false} okText={'Simpan'} cancelText={'Kembali'} onOk={handleSubmit(onSubmit)} onCancel={handleCancel} confirmLoading={loading['update']}>
        <p>Kamu hanya dapat mengubah nama 1 kali lagi. Pastikan nama sudah benar.</p>
        <Form layout='vertical'>
          <InputField label={editField} name='value' control={control} placeholder='Inputkan ini' errors={errors} />
        </Form>
      </Modal>
    </Content>
  );
}
