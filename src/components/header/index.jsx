import { UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { FaUserGraduate, FaUserPlus } from 'react-icons/fa';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useLocation, Link } from 'react-router-dom';

import Logout from '../logout';
import './index.css';

const Header = ({ isAutheticated, pathname }) => {
  const location = useLocation();
  console.log('PATHNAME HEADER: ', pathname);
  const dynamicClassName = '';

  /* pathname === '/' ||
    pathname === '/new-account' ||
    pathname === `/users/feedbacks/:id/new-feedback`
    ? (dynamicClassName = 'menu-login')
    : (dynamicClassName = 'menu'); */

  return (
    <div className="menu">
      {isAutheticated ? (
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/users">
            <Link to="/users">
              <FaUserGraduate size={18} />
              &nbsp; Alunos
            </Link>
          </Menu.Item>
          <Menu.Item key="/">
            <Logout />
          </Menu.Item>
        </Menu>
      ) : (
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/new-account">
              <Link to="/new-account">
                <FaUserPlus size={18} />
              &nbsp; Novo Usuário
            </Link>
            </Menu.Item>
            <Menu.Item key="/">
              <Link to="/">
                <RiLoginBoxLine size={18} />
              &nbsp;Login
            </Link>
            </Menu.Item>
          </Menu>
        )}
    </div>
  );
};

export default Header;
