import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockTags from '@/mocks/tags';
import { NotionTagList } from '.';

describe('NotionTagList 컴포넌트', () => {
  it('태그 리스트가 표시된다.', () => {
    render(<NotionTagList tags={mockTags} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument;
  });

  it('태그 아이템이 태그 이름과 함께 표시된다.', () => {
    render(<NotionTagList tags={mockTags} />);

    const items = screen.getAllByRole('listitem');

    expect(items[0]).toHaveTextContent('React Query');
    expect(items[1]).toHaveTextContent('React');
  });

  it('태그 아이템을 클릭하면 해당 태그의 포스트 리스트 페이지로 이동한다.', async () => {
    const user = userEvent.setup();

    render(<NotionTagList tags={mockTags} />, {
      wrapper: MemoryRouterProvider
    });

    const firstitemLink = screen.getAllByTestId('notion-tag-item-link')[0];

    await user.click(firstitemLink);

    expect(mockRouter.asPath).toEqual('/tags/react-query/pages/1');
  });
});
