import React, { useState } from 'react';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';

const MenuComponent = ({
  items = [],
  defaultMode = 'inline',
  defaultTheme = 'light',
  width = '100%',
  height = '100%',
}) => {
  const location = useLocation()
  const [mode, setMode] = useState(defaultMode);
  const [theme, setTheme] = useState(defaultTheme);

  const handleChangeMode = (value) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const handleChangeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const activeMenu = {
    '/user/profile' : '1',
    '/user/order-list':'2'
  }

  return (
    <>
      <Menu
        style={{
          width,
          height
        }}
        selectedKeys={activeMenu[location.pathname]}
        mode={mode}
        theme={theme}
        items={items}
      />
    </>
  );
};

export default MenuComponent;
