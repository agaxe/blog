import React from 'react';
import { render } from '@testing-library/react';
import useSWR from 'swr';
import { NotionPageList } from '.';

jest.mock('swr');

interface Props {
  data: React.ComponentProps<typeof NotionPageList>['data'];
}

const mockProps: Props = {
  data: [
    {
      koId: 'msw-6231c9937b2e49e18ad6000eeabe7e38',
      id: '6231c9937b2e49e18ad6000eeabe7e38',
      title: 'msw',
      tags: [
        {
          id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
          name: 'React',
          color: 'blue'
        },
        {
          id: '85ec6031-9063-42d1-a512-7dbb5c9ddb62',
          name: 'Test',
          color: 'default'
        }
      ],
      createdAt: '2024-04-29T11:33:00.000Z',
      isCompleted: true
    },
    {
      koId: 'Query-Key-Factory-075d33a2e2ea4912b9ea85c3045f38c0',
      id: '075d33a2e2ea4912b9ea85c3045f38c0',
      title: 'Query Key Factory',
      tags: [
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
      ],
      createdAt: '2024-02-18T12:57:00.000Z',
      isCompleted: true
    }
  ]
};

const mockData = {
  tags: {
    react: 10,
    'react query': 3
  }
};

const swrMock = <T extends unknown>(data: T) =>
  (useSWR as jest.Mock).mockReturnValueOnce({
    data,
    isLoading: false,
    error: null
  });

describe('NotionPageList 컴포넌트', () => {
  it('페이지 리스트 데이터 여부에 따른 UI 표시', () => {
    swrMock(undefined);
    swrMock(mockData.tags);

    const { container } = render(<NotionPageList data={mockProps.data} />);

    const pageList = container.querySelector('ul:nth-child(2)');
    const pageItems = pageList?.querySelectorAll(
      ':scope > li'
    ) as NodeListOf<Element>;

    expect(pageItems).toHaveLength(2);
    expect(pageItems[1]).toHaveTextContent('Query Key Factory');
  });
});
