import { Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  :hover::placeholder {
    padding-left: 10px;
    transition: all 0.4s;
  }
  width: 214px;

  :focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }
`;

StyledInput.Password = styled(Input.Password)`
  width: 214px;

  :focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }

  :hover::placeholder {
    padding-left: 10px;
    transition: all 0.4s;
  }
`;

export default StyledInput;
