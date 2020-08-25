import React from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const onClick = () => {
    localStorage.removeItem('AuthToken');
    history.push('/');
  };

  return (
    <div onClick={onClick}>
      Logout
      <span>
        &nbsp;
        <RiLogoutBoxRLine size={18} />
      </span>
    </div>
  );
};

export default Logout;
