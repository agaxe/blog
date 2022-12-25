import Link from 'next/link';
import styled, { css } from 'styled-components';
import { Icon } from '@/components/common/Icon';
import { device } from '@/styles/device';

const variables = {
  padding: '16px'
};

const iconStyle = css`
  path {
    fill: ${({ theme }) => theme.color.default};
  }
`;

export const Button = styled.button`
  outline: none;
  border: 0;
  background: none;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ModalBg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalInner = styled.div`
  max-width: 600px;
  ${device('md')} {
    max-width: 80%;
  }
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bgColor.default};
  transform: translate(0, 100px);
  border-radius: 8px;
  overflow: hidden;
  color: ${({ theme }) => theme.color.default};
`;

export const SearchIcon = styled(Icon)`
  width: calc(var(--size-header-icon-w) - 2px);
  ${iconStyle}
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${variables.padding};
`;

export const InputSearchIcon = styled(Icon)`
  width: var(--size-header-icon-w);
  margin-right: 16px;
  ${iconStyle}
`;

export const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  font-size: inherit;
  line-height: 1;
  background-color: inherit;
  color: inherit;
  caret-color: ${({ theme }) => theme.color.default};
`;

export const ResultList = styled.ul`
  width: 100%;
  border: 0;
  outline: none;
  font-size: inherit;
  line-height: 1;
  overflow-y: auto;
  max-height: 250px;
`;

export const ResultItem = styled.li`
  border-top: 1px solid ${({ theme }) => theme.border.gray};
`;

export const ResultLink = styled(Link)`
  display: block;
  padding: ${variables.padding};
  color: inherit;
`;
