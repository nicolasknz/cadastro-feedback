import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import LoginForm from '../login-form';

const Authenticator = () => {
  const [isAutheticated, setAuthentication] = useState(undefined);
  const history = useHistory();

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
  }, [history, setAuthentication]);

  if (isAutheticated === undefined) {
    return <div>Loading . . . (inserir animaçao)</div>;
  }

  if (isAutheticated === false) {
    return (
      <Switch>
        <Route path="/new-account">
          <div>new account page</div>
        </Route>
        <Route exact path="/">
          <LoginForm setAuthentication={setAuthentication} />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/account-list">
        <div>account list page</div>
      </Route>
    </Switch>
  );
};

export default Authenticator;
