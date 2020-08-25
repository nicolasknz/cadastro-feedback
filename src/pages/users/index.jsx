import { Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { VscFeedback } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import { LoginContainer } from '../../styled';

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = window.localStorage.getItem('AuthToken');

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 500,
    },
    {
      title: 'User',
      dataIndex: 'user',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 300,
    },
    {
      title: 'Feedbacks',
      dataIndex: 'feedbacks',
      width: 250,
    },
  ];

  const data = users.map((item) => {
    return {
      id: item.id,
      name: item.name,
      user: item.user,
      email: item.email,
      feedbacks: (
        <Link to={`/users/feedbacks/${item.id}`}>
          <VscFeedback size={25} />
        </Link>
      ),
    };
  });

  useEffect(() => {
    axios
      .get('https://ka-users-api.herokuapp.com/users', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <Spring from={{ opacity: 0, marginLeft: -500 }} to={{ opacity: 1, marginLeft: 0 }}>
      {(props) => (
        <LoginContainer>
          <div style={props}>
            <h1 style={{ color: 'white' }}>Alunos</h1>
            <Table
              size="default"
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </LoginContainer>
      )}
    </Spring>
  );
};

export default Users;
