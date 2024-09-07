import { render, screen } from '@testing-library/react';
import tagsWithCnt from '@/mocks/tagsWithCnt';
import { TagList } from '.';

describe('TagList 컴포넌트', () => {
  it('props 체크', () => {
    render(<TagList tags={tagsWithCnt} />);

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
