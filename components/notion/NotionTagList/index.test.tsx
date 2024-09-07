import { render, screen } from '@testing-library/react';
import { NotionTagList } from '.';

type Tags = React.ComponentProps<typeof NotionTagList>['tags'];

const mockTags: Tags = [
  {
    id: '40bb4eaa-8c7e-44c0-aaf1-3d901014932a',
    name: 'React Query',
    color: 'brown'
  },
  {
    id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
    name: 'React',
    color: 'blue'
  }
];

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
