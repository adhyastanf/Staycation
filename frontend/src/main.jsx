import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
          colorText: '#152C5B',
          fontSizeHeading1: '42px',
        },
        components: {
          Layout: {
            headerBg: 'white',
            colorBgLayout: 'white',
            headerPadding: '0 150px',
          },
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0,
          },
          Card:{
            actionsLiMargin:0
          }
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
