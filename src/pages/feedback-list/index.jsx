import { Table, Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
    <>
      <h2 style={{ color: 'white' }}>Feedbacks</h2>
      <Table size="default" columns={columns} dataSource={feedback} pagination={{ pageSize: 10 }} />
      <Button
        type="primary"
        onClick={() => history.push(`/users/feedbacks/${params.id}/new-feedback`)}>
        New Feedback
      </Button>
    </>
  );
};

export default FeedbackList;
