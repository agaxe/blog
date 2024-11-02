import NextLink from 'next/link';
import styled, { css } from 'styled-components';
import { Icon } from '@/components/common/Icon';

export const Wrap = styled.div`
  border: 1px solid var(--color-line-bookmark);
  list-style: none;
  padding: 24px;
  width: 100%;
  border-radius: 3px;
  display: grid;
  gap: 24px;
`;

export const ContentContainer = styled.div`
  display: grid;
  gap: 24px;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
`;

export const List = styled.ul`
  width: fit-content;
  display: grid;
  gap: 8px;
  list-style: none;
`;

export const Item = styled.li`
  list-style: none;
`;

export const Link = styled(NextLink)<{ $isActive: boolean }>`
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--color-primary);
      font-weight: 700;
    `};

  &:hover {
    text-decoration: underline;
  }
`;

export const PostName = styled.p`
  font-size: 1rem;
`;

export const ShowHideToggleBtn = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  appearance: none;
  background: none;
  border: 0;
  color: var(--color-gray);
  cursor: pointer;
`;

export const ShowHideToggleBtnIcon = styled(Icon)<{ isShowList: boolean }>`
  width: 24px;
  height: 24px;
  color: inherit;
  transform: rotate(${({ isShowList }) => (isShowList ? '180deg' : 0)});
`;

export const ShowHideToggleBtnText = styled.p`
  font-size: 0.875rem;
`;
