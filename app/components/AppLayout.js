import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, theme } from 'antd';
const { Header, Content } = Layout;
const { Item } = Menu;

const AppLayaout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [current, setCurrent] = useState('patients-records');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className='text-white text-lg mr-6'>Patient Management System</div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleClick} 
          selectedKeys={[current]}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
            <Item key="patients-records">
                <Link href="/">Patients Records</Link>
            </Item>
            <Item key="patients">
                <Link href="/patients">Patients</Link>
            </Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
export default AppLayaout;