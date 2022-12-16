import styled, { css } from 'styled-components';
import { device } from '@/styles/device';

const variables: any = {
  size: {
    md: '112px',
    sm: '72px'
  }
};

const getSize = (size: string) => {
  return css`
    width: ${size};
    height: ${size};
  `;
};

export const Profile = styled.div`
  ${getSize(variables.size.md)}
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  ${device('md')} {
    ${getSize(variables.size.sm)}
  }
`;
