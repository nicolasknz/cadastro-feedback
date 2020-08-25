import { Input } from 'antd';
import styled from 'styled-components';

const StyledInput = styled(Input)`
  :hover::placeholder {
    padding-left: 10px;
    transition: all 0.4s;
  }

  :focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }
`;

export default StyledInput;
