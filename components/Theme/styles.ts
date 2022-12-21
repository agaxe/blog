import styled, { css } from 'styled-components';
import { Icon } from '@/components/common/Icon';

export const Theme = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
`;

export const Button = styled.button`
  background: none;
  border: 0;
  outline: none;
  cursor: pointer;
`;

const iconStyle = css`
  width: 20px;
`;

export const LightIcon = styled(Icon)`
  ${iconStyle}
  path {
    fill: var(--color-white);
  }
`;

export const DarkIcon = styled(Icon)`
  ${iconStyle}
`;
