import { Form, Input, Button } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NewFeedback = () => {
  const params = useParams();
  const token = localStorage.getItem('AuthToken');
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Success(newFeedback):', values);

    axios
      .post(
        `https://ka-users-api.herokuapp.com/users/${params.id}/feedbacks`,
        {
          feedback: { ...values },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push(`/users/feedbacks/${params.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="outer-container">
      <h2>Novo Feedback</h2>
      <Form
        className="form"
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item label="Nome" name="name" rules={[{}]}>
          <Input placeholder="Nome" />
        </Form.Item>

        <Form.Item label="Comentario" name="comment" rules={[{}]}>
          <Input placeholder="Comentario" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Invalid email' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Grade" name="grade" rules={[]}>
          <Input placeholder="Grade" />
        </Form.Item>

        <Form.Item className="btn-form" {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewFeedback;
