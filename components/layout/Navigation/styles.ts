import Link from 'next/link';
import styled from 'styled-components';
import { Icon } from '@/components/common/Icon';

export const Navigation = styled.div`
  display: flex;
  padding: 24px 0;
  align-items: center;
`;

export const ViewPages = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const ViewPagesLink = styled(Link)`
  transition: color 0.3s;
  font-size: 14px;
  &:hover {
    color: var(--color-gray-hover);
  }
`;

export const PrevArrowLink = styled(Link)`
  margin-right: auto;
`;

export const NextArrowLink = styled(Link)`
  margin-left: auto;
`;

export const ArrowIcon = styled(Icon)`
  path {
    transition: fill 0.3s;
  }
  &:hover {
    path {
      fill: var(--color-gray-hover);
    }
  }
`;
