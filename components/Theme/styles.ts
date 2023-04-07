import styled, { css } from 'styled-components';
import { Icon } from '@/components/common/Icon';

export const Theme = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  background: none;
  border: 0;
  outline: none;
  cursor: pointer;
`;

const iconStyle = css`
  width: var(--size-header-icon-w);
  path {
    fill: var(--color-default);
  }
`;

export const LightIcon = styled(Icon)`
  ${iconStyle}
`;

export const DarkIcon = styled(Icon)`
  ${iconStyle}
`;
