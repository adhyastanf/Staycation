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
          linkDecoration: 'rgba(176, 176, 176, 1)',
          linkHoverDecoration: 'rgba(176, 176, 176, 0.5)',
          fontSizeHeading1: '2.625rem',
          fontSizeHeading2: '2.25rem',
          fontSizeHeading3: '1.625rem',
          fontSizeHeading5: '1.125rem',
          // fontSize: '1rem',
          colorSplit: 'rgba(0, 0, 0, 0.1)',
        },
        components: {
          Layout: {
            headerBg: 'white',
            colorBgLayout: 'white',
            headerPadding: '0 150px',
          },
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop:0,
          },
          Card: {
            actionsLiMargin: 0,
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
