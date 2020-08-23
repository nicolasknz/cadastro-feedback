import { Form, Input, Button } from 'antd';
import axios from 'axios';
import React from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);

    axios
      .post('https://ka-users-api.herokuapp.com/users', {
        user: { ...values },
      })
      .then((res) => {
        console.log(res);
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
      <h2>Cadastro de usuário</h2>
      <Form
        className="form"
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            { min: 7, message: 'Must be at least 7 characters' },
            { required: true, message: 'Please input your name!' },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Usuario"
          name="user"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: 'email', message: 'Invalid email' },
            { required: true, message: 'Please input your username!' },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[
            { min: 6, message: 'Must be at least 6 characters' },
            { pattern: '(?=.*[!@#$%^&*])', message: 'Must have special character' },
            { required: true, message: 'Please input your password!' },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirmar Senha "
          name="password_confirmation"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}>
          <Input.Password />
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

export default UserForm;
