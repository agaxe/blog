import styled from 'styled-components';

const variables = {
  size: '112px'
};

export const Profile = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${variables.size};
  height: ${variables.size};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`;
