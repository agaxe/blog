import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '.';

describe('Header 컴포넌트', () => {
  it('헤더 높이 값 이상 스크롤 되면 헤더가 사라진다.', () => {
    render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle('margin-top: calc(var(--layout-header-h) * -1)');
  });

  it(`'Tags' 버튼 클릭 시 태그 리스트 페이지로 이동한다.`, async () => {
    const user = userEvent.setup();

    render(<Header />, { wrapper: MemoryRouterProvider });

    const tagLinkBtn = screen.getByRole('link', { name: 'Tags' });

    await user.click(tagLinkBtn);

    expect(mockRouter.asPath).toEqual('/tags');
  });
});
