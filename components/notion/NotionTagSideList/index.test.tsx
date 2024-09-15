import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockSideTags from '@/mocks/sideTags';
import { NotionTagSideList } from '.';

const mockProps = {
  data: mockSideTags
};

describe('NotionTagSideList 컴포넌트', () => {
  it('태그 목록 렌더링', () => {
    render(<NotionTagSideList data={mockProps.data} />, {
      wrapper: MemoryRouterProvider
    });

    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    const firstItemTitle = items[0].querySelector('a > p:first-child');
    const firstItemCnt = items[0].querySelector('a > p:last-child');

    expect(list).toBeInTheDocument;
    expect(items).toHaveLength(2);
    expect(firstItemTitle).toHaveTextContent('React');
    expect(firstItemCnt).toHaveTextContent('(10)');
  });

  it('태그 아이템 링크 클릭', async () => {
    const user = userEvent.setup();

    render(<NotionTagSideList data={mockProps.data} />, {
      wrapper: MemoryRouterProvider
    });

    const items = screen.getAllByRole('listitem');
    const secondItemLink = items[1].querySelector('a') as HTMLAnchorElement;

    await user.click(secondItemLink);

    expect(mockRouter.asPath).toEqual('/tags/react%20query/pages/1');
  });
});
