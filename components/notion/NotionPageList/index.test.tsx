import React from 'react';
import { render } from '@testing-library/react';
import useSWR from 'swr';
import parsePageItems from '@/mocks/parsePageItems';
import { NotionPageList } from '.';

jest.mock('swr');

interface Props {
  data: React.ComponentProps<typeof NotionPageList>['data'];
}

const mockProps: Props = {
  data: parsePageItems
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

    expect(pageItems).toHaveLength(10);
    expect(pageItems[1]).toHaveTextContent('포스트 제목_2');
  });
});
