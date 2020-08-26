import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';

import { LoginContainer, FormContainer } from '../../styled';
import StyledInput from '../../styled/styled-input';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = ({ setAuthentication }) => {
  const [token, setToken] = useState(localStorage.getItem('AuthToken'));
  const [requestError, setRequestError] = useState('');
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Success:', values);
    axios
      .post('https://ka-users-api.herokuapp.com/authenticate', { ...values })
      .then((res) => {
        console.log(res);
        setToken(res.auth_token);
        localStorage.setItem('AuthToken', res.data.auth_token);
        setAuthentication(true);
        history.push('/users');
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 401) {
          return setRequestError('Credenciais Inválidas');
        }

        setRequestError('Erro na requisição');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Spring from={{ opacity: 0, marginLeft: -500 }} to={{ opacity: 1, marginLeft: 0 }}>
      {(props) => (
        <div style={props}>
          <LoginContainer>
            <FormContainer>
              <div className="Login-Kenzie-Logo" />
              <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item name="user">
                  <StyledInput placeholder="Usuário" />
                </Form.Item>

                <Form.Item
                  name="password"
                  extra={requestError && <div style={{ color: 'red' }}>{requestError}</div>}>
                  <StyledInput.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
            </FormContainer>
          </LoginContainer>
        </div>
      )}
    </Spring>
  );
};

export default LoginForm;
