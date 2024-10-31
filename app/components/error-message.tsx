import styled from 'styled-components';

const ErrorMessageContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 16px;
  border-radius: 8px;
  margin: 16px;
  font-size: 16px;
  display: flex;
  align-items: center;

  &::before {
    content: '⚠️';
    margin-right: 10px;
  }
`;

const ErrorMessage = ({ message }: { message: string }) => (<ErrorMessageContainer>{message}</ErrorMessageContainer>);

export default ErrorMessage;