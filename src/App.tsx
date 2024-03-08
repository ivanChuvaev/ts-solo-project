import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import Root from './components/Root';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import 'react-toastify/ReactToastify.css';
import CookieWarning from './components/ui/CookieWarning';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/*',
        Component: NotFound
      }
    ],
  },
]);

function App(): JSX.Element {


  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <RouterProvider router={router} />
      <ToastContainer position="bottom-left" />
      <CookieWarning />
    </ConfigProvider>
  );
}

export default App;
