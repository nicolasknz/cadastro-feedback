import { Table, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiChatNewLine } from 'react-icons/ri';
import { useParams, useHistory } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import { LoginContainer } from '../../styled';

const FeedbackList = () => {
  const token = localStorage.getItem('AuthToken');
  const [feedback, setFeedback] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setFeedback(res.data);
        console.log('RES FEEDBACK', res);
      });
  }, [setFeedback, params]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: 600,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: 200,
    },
  ];

  return (
    <Spring from={{ opacity: 0, marginLeft: -500 }} to={{ opacity: 1, marginLeft: 0 }}>
      {(props) => (
        <LoginContainer>
          <div style={props}>
            <h1 style={{ color: 'white' }}>Feedbacks</h1>
            <Table
              size="default"
              columns={columns}
              dataSource={feedback}
              pagination={{ pageSize: 10 }}
            />
            <Button
              type="primary"
              onClick={() => history.push(`/users/feedbacks/${params.id}/new-feedback`)}>
              New Feedback &nbsp;
              <RiChatNewLine size={18} />
            </Button>
          </div>
        </LoginContainer>
      )}
    </Spring>
  );
};

export default FeedbackList;
