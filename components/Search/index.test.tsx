import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen
} from '@testing-library/react';
import useSWR from 'swr';
import { Search } from '.';
import { useSearch } from './hooks/useSearch';

const mockData = [
  {
    object: 'page',
    id: 'dcdea4b5-86d6-4626-b1ad-d5cfddb12637',
    created_time: '2022-11-08T14:21:00.000Z',
    last_edited_time: '2023-04-27T09:51:00.000Z',
    created_by: {
      object: 'user',
      id: '6d267113-3fcb-479f-9462-8cefaf37ceea'
    },
    last_edited_by: {
      object: 'user',
      id: '6d267113-3fcb-479f-9462-8cefaf37ceea'
    },
    cover: null,
    icon: null,
    parent: {
      type: 'database_id',
      database_id: '732c353b-c111-4048-b561-4b7ec5241309'
    },
    archived: false,
    in_trash: false,
    properties: {
      '수정 필요': {
        id: 'C%3EQL',
        type: 'rich_text',
        rich_text: []
      },
      tags: {
        id: 'ej%5By',
        type: 'multi_select',
        multi_select: [
          {
            id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
            name: 'React',
            color: 'blue'
          }
        ]
      },
      createdAt: {
        id: 'gma%3A',
        type: 'created_time',
        created_time: '2022-11-08T14:21:00.000Z'
      },
      status: {
        id: 'q%3Ckt',
        type: 'status',
        status: {
          id: '65f000e2-d6d3-490b-aa36-420832a0385e',
          name: 'complete',
          color: 'green'
        }
      },
      updatedAt: {
        id: 'utn%60',
        type: 'last_edited_time',
        last_edited_time: '2023-04-27T09:51:00.000Z'
      },
      name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'React v18',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'React v18',
            href: null
          }
        ]
      }
    },
    url: 'https://www.notion.so/React-v18-dcdea4b586d64626b1add5cfddb12637',
    public_url:
      'https://agaxe.notion.site/React-v18-dcdea4b586d64626b1add5cfddb12637'
  },
  {
    object: 'page',
    id: '2f125a66-601b-4ede-b522-47eb6b44b475',
    created_time: '2022-11-21T07:55:00.000Z',
    last_edited_time: '2023-01-20T08:01:00.000Z',
    created_by: {
      object: 'user',
      id: '6d267113-3fcb-479f-9462-8cefaf37ceea'
    },
    last_edited_by: {
      object: 'user',
      id: '6d267113-3fcb-479f-9462-8cefaf37ceea'
    },
    cover: null,
    icon: null,
    parent: {
      type: 'database_id',
      database_id: '732c353b-c111-4048-b561-4b7ec5241309'
    },
    archived: false,
    in_trash: false,
    properties: {
      '수정 필요': {
        id: 'C%3EQL',
        type: 'rich_text',
        rich_text: []
      },
      tags: {
        id: 'ej%5By',
        type: 'multi_select',
        multi_select: [
          {
            id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
            name: 'React',
            color: 'blue'
          },
          {
            id: '40bb4eaa-8c7e-44c0-aaf1-3d901014932a',
            name: 'React Query',
            color: 'brown'
          }
        ]
      },
      createdAt: {
        id: 'gma%3A',
        type: 'created_time',
        created_time: '2022-11-21T07:55:00.000Z'
      },
      status: {
        id: 'q%3Ckt',
        type: 'status',
        status: {
          id: '65f000e2-d6d3-490b-aa36-420832a0385e',
          name: 'complete',
          color: 'green'
        }
      },
      updatedAt: {
        id: 'utn%60',
        type: 'last_edited_time',
        last_edited_time: '2023-01-20T08:01:00.000Z'
      },
      name: {
        id: 'title',
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'React Query 기본 개념',
              link: null
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default'
            },
            plain_text: 'React Query 기본 개념',
            href: null
          }
        ]
      }
    },
    url: 'https://www.notion.so/React-Query-2f125a66601b4edeb52247eb6b44b475',
    public_url:
      'https://agaxe.notion.site/React-Query-2f125a66601b4edeb52247eb6b44b475'
  }
];

const mockResults = [
  {
    koId: 'React-v18-dcdea4b586d64626b1add5cfddb12637',
    id: 'dcdea4b586d64626b1add5cfddb12637',
    title: 'React v18',
    tags: [
      {
        id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
        name: 'React',
        color: 'blue'
      }
    ],
    createdAt: '2022-11-08T14:21:00.000Z',
    isCompleted: true
  },
  {
    koId: 'React-Query-기본-개념-2f125a66601b4edeb52247eb6b44b475',
    id: '2f125a66601b4edeb52247eb6b44b475',
    title: 'React Query 기본 개념',
    tags: [
      {
        id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
        name: 'React',
        color: 'blue'
      },
      {
        id: '40bb4eaa-8c7e-44c0-aaf1-3d901014932a',
        name: 'React Query',
        color: 'brown'
      }
    ],
    createdAt: '2022-11-21T07:55:00.000Z',
    isCompleted: true
  }
];

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('swr');

jest.useFakeTimers();

describe('Search 컴포넌트', () => {
  (useSWR as jest.Mock).mockReturnValue({
    data: mockData,
    isLoading: false,
    error: null
  });

  const openModalAssert = () => {
    render(<Search />, { wrapper: MemoryRouterProvider });

    const modalShowButton = screen.getByRole('button');
    fireEvent.click(modalShowButton);

    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument;
  };

  it('모달 활성화', () => {
    openModalAssert();
  });

  it('모달 활성화 시 검색 input focus', () => {
    openModalAssert();

    const input = screen.getByPlaceholderText('Search');
    expect(input).toHaveFocus();
  });

  it('검색 input value 변경', () => {
    openModalAssert();

    const input = screen.getByPlaceholderText('Search');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
      jest.advanceTimersByTime(800);
    });

    expect(input).toHaveValue('test');
  });

  it('검색 API - 성공', () => {
    openModalAssert();

    const searchResultList = screen.queryByRole('list');
    const searchResultListItems = screen.queryAllByRole('listitem');
    const itemLink1 = searchResultListItems[0].querySelector('a');

    expect(searchResultList).toBeInTheDocument;
    expect(searchResultListItems).toHaveLength(2);

    fireEvent.click(itemLink1 as HTMLElement);

    expect(mockRouter.asPath).toEqual('/dcdea4b586d64626b1add5cfddb12637');

    const { result } = renderHook(() => useSearch());

    expect(result.current.response.isLoading).toBe(false);
    expect(result.current.response.data).toEqual(mockResults);
  });

  it('검색 API - 로딩', () => {
    render(<Search />);

    (useSWR as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null
    });

    const searchLoadingIcon = screen.queryByTestId('search-loading-icon');

    expect(searchLoadingIcon).toBeInTheDocument;

    const { result } = renderHook(() => useSearch());

    expect(result.current.response.isLoading).toBe(true);
    expect(result.current.response.data).toEqual([]);
  });

  it('검색 API - 결과 없음', () => {
    render(<Search />);

    (useSWR as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });

    const notFoundResultText = screen.queryByText('검색 결과가 없습니다 :(');

    expect(notFoundResultText).toBeInTheDocument;

    const { result } = renderHook(() => useSearch());

    expect(result.current.response.isLoading).toBe(false);
    expect(result.current.response.data).toEqual([]);
  });
});
