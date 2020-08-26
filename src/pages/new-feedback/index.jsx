import { Form, Button } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
    <Spring from={{ opacity: 0, marginLeft: -500 }} to={{ opacity: 1, marginLeft: 0 }}>
      {(props) => (
        <Container>
          <div style={props}>
            <FormContainer>
              <h1 style={{ color: 'black' }}>Novo Feedback</h1>
              <Form
                className="form"
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item name="name" rules={[{}]}>
                  <StyledInput placeholder="Nome" />
                </Form.Item>

                <Form.Item name="comment" rules={[{}]}>
                  <StyledInput placeholder="Comentario" />
                </Form.Item>

                <Form.Item name="email" rules={[{ type: 'email', message: 'Invalid email' }]}>
                  <StyledInput placeholder="Email" />
                </Form.Item>

                <Form.Item name="grade" rules={[]}>
                  <StyledInput placeholder="Grade" />
                </Form.Item>

                <Form.Item className="btn-form" {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </FormContainer>
          </div>
        </Container>
      )}
    </Spring>
  );
};

export default NewFeedback;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  min-height: 100vh;
  background: #153169;
`;

const FormContainer = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 60px;
  margin-bottom: 200px;
`;
