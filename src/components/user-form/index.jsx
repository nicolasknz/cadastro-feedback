import { Form, Button } from 'antd';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import styled from 'styled-components';

import StyledInput from '../../styled/styled-input';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserForm = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Success:', values);
    history.push('/');

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
    <Spring from={{ opacity: 0, marginLeft: -500 }} to={{ opacity: 1, marginLeft: 0 }}>
      {(props) => (
        <Container>
          <FormContainer>
            <h1>Cadastro</h1>
            <Form
              className="form"
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                name="name"
                rules={[
                  { min: 7, message: 'Must be at least 7 characters' },
                  { required: true, message: 'Please input your name!' },
                ]}>
                <StyledInput placeholder="Nome" />
              </Form.Item>

              <Form.Item
                name="user"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <StyledInput placeholder="Usuário" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { type: 'email', message: 'Invalid email' },
                  { required: true, message: 'Please input your username!' },
                ]}>
                <StyledInput placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { min: 6, message: 'Must be at least 6 characters' },
                  { pattern: '(?=.*[!@#$%^&*])', message: 'Must have special character' },
                  { required: true, message: 'Please input your password!' },
                ]}>
                <StyledInput.Password placeholder="Senha" />
              </Form.Item>

              <Form.Item
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
                <StyledInput.Password placeholder="Confirmar senha" />
              </Form.Item>

              <Form.Item className="btn-form" {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </FormContainer>
        </Container>
      )}
    </Spring>
  );
};

export default UserForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 100%;
  min-height: 100vh;
  background: #282c34;
  padding-bottom: 100px;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 60px;
  border-radius: 20px;
  margin-bottom: 200px;
`;
