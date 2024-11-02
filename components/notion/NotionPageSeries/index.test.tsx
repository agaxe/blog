import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotionPageSeries } from '.';

const mockProps = {
  title: '시리즈 타이틀',
  posts: [
    {
      id: '5c426377-0a6f-4844-b1f7-1d672b51e6a7',
      title: '포스트 1'
    },
    {
      id: 'aff71ca7-b8c2-40cd-9506-e1e8ef6b4c4b',
      title: '포스트 2'
    }
  ]
};

mockRouter.useParser(createDynamicRouteParser(['/[pageId]']));

describe('NotionPageSeries 컴포넌트', () => {
  it('포스트 시리즈 타이틀이 표시된다.', () => {
    render(<NotionPageSeries {...mockProps} />);

    const title = screen.getByRole('heading', { level: 3 });

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('시리즈 타이틀');
  });

  it(`리스트가 닫혀있는 경우, '목록 열기' 버튼 클릭 시 리스트와 아이템이 표시된다.`, async () => {
    const user = userEvent.setup();
    render(<NotionPageSeries {...mockProps} />);

    const listToggleBtn = screen.getByRole('button', { name: '목록 열기' });
    await user.click(listToggleBtn);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('리스트 아이템의 링크를 클릭하면 해당 포스트 페이지로 이동한다.', async () => {
    const user = userEvent.setup();
    render(<NotionPageSeries {...mockProps} />, {
      wrapper: MemoryRouterProvider
    });

    const listToggleBtn = screen.getByRole('button', { name: '목록 열기' });
    await user.click(listToggleBtn);

    const firstPostItemLink = screen.getAllByRole('link')[0];
    await user.click(firstPostItemLink);

    expect(mockRouter.asPath).toEqual('/5c426377-0a6f-4844-b1f7-1d672b51e6a7');
  });

  it(`리스트가 열려있는 경우, '목록 닫기' 버튼 클릭 시 리스트가 표시되지 않는다.`, async () => {
    const user = userEvent.setup();
    render(<NotionPageSeries {...mockProps} />);

    await user.click(screen.getByRole('button', { name: '목록 열기' }));
    await user.click(screen.getByRole('button', { name: '목록 닫기' }));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('현재 페이지에 해당하는 아이템에 active 스타일이 적용된다.', async () => {
    const user = userEvent.setup();
    render(<NotionPageSeries {...mockProps} />, {
      wrapper: MemoryRouterProvider
    });

    await user.click(screen.getByRole('button', { name: '목록 열기' }));

    const firstPostItemLink = screen.getAllByRole('link')[0];

    await user.click(firstPostItemLink);
    act(() => {
      mockRouter.push(firstPostItemLink.getAttribute('href') ?? '');
    });

    expect(firstPostItemLink).toHaveStyleRule('color', 'var(--color-primary)');
  });
});
