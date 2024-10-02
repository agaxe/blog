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
  it('태그 리스트가 표시된다.', () => {
    render(<NotionTagSideList data={mockProps.data} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument;
  });

  it('태그 아이템이 데이터 갯수만큼 표시된다.', () => {
    render(<NotionTagSideList data={mockProps.data} />);

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(2);
  });

  it('태그 아이템에 태그 이름이 표시된다.', () => {
    render(<NotionTagSideList data={mockProps.data} />);

    const tagName = screen.getAllByRole('paragraph')[0];

    expect(tagName.textContent).toBe('React');
  });

  it('태그에 해당하는 포스트 갯수가 표시된다.', () => {
    render(<NotionTagSideList data={mockProps.data} />);

    const tagCnt = screen.queryByText('(10)', { selector: 'span' });

    expect(tagCnt).toBeInTheDocument();
  });

  it('태그 아이템을 클릭하면 해당 태그의 포스트 리스트 페이지로 이동한다.', async () => {
    const user = userEvent.setup();

    render(<NotionTagSideList data={mockProps.data} />, {
      wrapper: MemoryRouterProvider
    });

    const secondItem = screen.getAllByRole('listitem')[1];
    const secondItemLink = secondItem.querySelector('a') as HTMLAnchorElement;

    await user.click(secondItemLink);

    expect(mockRouter.asPath).toEqual('/tags/react-query/pages/1');
  });
});
