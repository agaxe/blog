import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Header 컴포넌트', () => {
  it('스크롤 시 헤더 hide', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('margin-top: calc(var(--layout-header-h) * -1)');
  });

  it('태그 링크 버튼 클릭', () => {
    render(<Header />, { wrapper: MemoryRouterProvider });

    const tagLinkBtn = screen.getByRole('link', { name: /tags/i });

    fireEvent.click(tagLinkBtn);

    expect(mockRouter.asPath).toEqual('/tags');
  });
});
