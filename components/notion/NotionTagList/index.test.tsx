import { render, screen } from '@testing-library/react';
import mockTags from '@/mocks/tags';
import { NotionTagList } from '.';

describe('NotionTagList 컴포넌트', () => {
  it('pros.tags 를 통한 태그 리스트 렌더링', () => {
    render(<NotionTagList tags={mockTags} />);

    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');

    expect(list).toBeInTheDocument;
    expect(items[0]).toHaveTextContent('React Query');
    expect(items[1]).toHaveTextContent('React');
  });
});
