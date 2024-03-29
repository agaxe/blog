import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@/components/common/Button';

export const Wrap = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentBox = styled.div`
  text-align: center;
  display: grid;
  gap: 16px;
  user-select: none;
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
`;

export const Desc = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--color-gray);
`;

export const HomeBtn = styled(Button)`
  padding: 0;
`;
export const HomeBtnLink = styled(Link)`
  padding: 8px;
  display: block;
  width: 100%;
  height: 100%;
`;
