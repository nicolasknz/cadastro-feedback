import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  background: #fff;
  border-radius: 25px;
  padding: 50px 20px 20px 20px;

  @media screen and (min-width: 800px) {
    background: #fff;
    border-radius: 20px;
    padding: 60px;
    margin-bottom: 200px;
  }
`;

export default FormContainer;
