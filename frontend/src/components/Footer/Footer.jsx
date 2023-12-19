import { Flex, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const { Title, Paragraph, Text } = Typography;

function Footer() {
  const linkFooter = [
    {
      title: 'For Beginners',
      link: ['New Account', 'Start Booking a Room', 'Use Payments'],
    },
    {
      title: 'Explore Us',
      link: ['Our Account', 'Privacy', 'Terms & Conditions'],
    },
    {
      title: 'Connect Us',
      link: ['support@staycation.id', '021 - 2208 - 1996', 'Staycation, Kemang, Jakarta'],
    },
  ];

  return (
    <Flex style={{ margin: '50px 150px' }} gap={132}>
      <Space direction='vertical'>
        <Title level={3} style={{ marginTop: 0 }}>
          <span style={{ color: '#3252DF' }}>Stay</span>
          cation.
        </Title>
        <Text className={styles.textStyle}>We kaboom your beauty holiday instantly and memorable.</Text>
      </Space>
      <Space direction='vertical' size={50}>
        <Flex flex={1} gap={72}>
          {linkFooter.map((footer, footerIndex) => (
            <Space direction='vertical' key={footerIndex} size={16}>
              <Title level={5} style={{ margin: 0 }}>
                {footer.title}
              </Title>
              <Space direction='vertical' key={footerIndex} size={8}>
                {footer.link.map((link, linkIndex) => (
                  <Link className={styles.textStyle} key={linkIndex}>
                    {link}
                  </Link>
                ))}
              </Space>
            </Space>
          ))}
        </Flex>
        <Text className={styles.textStyle}>Copyright 2019 • All rights reserved • Staycation</Text>
      </Space>
    </Flex>
  );
}

export default Footer;
