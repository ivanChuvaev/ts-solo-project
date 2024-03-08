import type { MenuProps } from 'antd';
import { Layout, Menu, Space } from 'antd';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DContainer from './ui/DContainer';
import DNavLink from './ui/DNavLink';
import Footer from './ui/Footer';

const navLinks: Exclude<MenuProps['items'], undefined> = [{
  key: 'home',
  label: <NavLink to="/" className="root-nav-link">Home</NavLink>,
},
{
  key: 'Something',
  label: <NavLink to="/something" className="root-nav-link">Something</NavLink>,
}]

export default function Root(): JSX.Element {
  return (
    <Layout style={{ width: '100vw', height: '100%' }}>
      <Layout.Header style={{ color: 'wheat' }}>
        <DContainer style={{ height: '100%' }}>
          <div className="header-nav-bar" >
            <DNavLink to="/">
              Home
            </DNavLink>
            <DNavLink to="/something">
              Something
            </DNavLink>
          </div>
        </DContainer>
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer style={{ background: 'wheat' }}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}
