import { render, screen } from '@testing-library/react';
import { TagsWithCnt } from '@/shared/types/TagsWithCnt';
import { TagList } from '.';

const mockProps: TagsWithCnt = [
  {
    id: '85ec6031-9063-42d1-a512-7dbb5c9ddb61',
    name: 'Test1',
    color: 'default',
    cnt: 1
  },
  {
    id: '85ec6031-9063-42d1-a512-7dbb5c9ddb62',
    name: 'Test Name',
    color: 'pink',
    cnt: 5
  }
];

describe('TagList 컴포넌트', () => {
  it('props 체크', () => {
    render(<TagList tags={mockProps} />);

    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');

    const item1 = items[0].querySelector('.notion-item-default');
    const item2 = items[1].querySelector('.notion-item-pink');

    const itemCnt1 = item1?.querySelector('p:last-child');
    const itemCnt2 = item2?.querySelector('p:last-child');

    expect(list).toBeInTheDocument;
    expect(items).toHaveLength(2);

    expect(item1).toHaveTextContent('Test1');
    expect(item2).toHaveTextContent('Test Name');

    expect(itemCnt1).toHaveTextContent('(1)');
    expect(itemCnt2).toHaveTextContent('(5)');
  });
});
