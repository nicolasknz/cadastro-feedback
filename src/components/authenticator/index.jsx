import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import FeedbackList from '../../pages/feedback-list';
import NewFeedback from '../../pages/new-feedback';
import Users from '../../pages/users';
import Header from '../header';
import LoginForm from '../login-form';
import UserForm from '../user-form';

const Authenticator = () => {
  const [isAutheticated, setAuthentication] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('AuthToken');

    if (!token) {
      setAuthentication(false);
    }
    axios
      .get('https://ka-users-api.herokuapp.com/users', {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setAuthentication(true);
      })
      .catch(() => {
        setAuthentication(false);
      });
  }, [history, setAuthentication, location]);

  if (isAutheticated === undefined) {
    return <LoadingOutlined />;
  }

  if (isAutheticated === false) {
    return (
      <>
        <Header isAutheticated={isAutheticated} pathname={location.pathname} />
        <Switch>
          <Route path="/new-account">
            <UserForm />
          </Route>
          <Route exact path="/">
            <LoginForm setAuthentication={setAuthentication} />
          </Route>
        </Switch>
      </>
    );
  }

  return (
    <>
      <Header isAutheticated={isAutheticated} pathname={location.pathname} />

      <Switch>
        <Route exact path="/">
          <LoginForm setAuthentication={setAuthentication} />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/feedbacks/:id">
          <FeedbackList />
        </Route>
        <Route exact path="/users/feedbacks/:id/new-feedback">
          <NewFeedback />
        </Route>
      </Switch>
    </>
  );
};

export default Authenticator;
