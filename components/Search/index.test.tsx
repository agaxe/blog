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
import notionPageItems from '@/mocks/notionPageItems';
import pageItems from '@/mocks/parsePageItems';
import { Search } from '.';
import { useSearch } from './hooks/useSearch';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('swr');

jest.useFakeTimers();

describe('Search 컴포넌트', () => {
  (useSWR as jest.Mock).mockReturnValue({
    data: notionPageItems,
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
    expect(searchResultListItems).toHaveLength(10);

    fireEvent.click(itemLink1 as HTMLElement);

    expect(mockRouter.asPath).toEqual('/c9d287d36ecc476a9c4ec9d8b98c9a6e');

    const { result } = renderHook(() => useSearch());

    expect(result.current.response.isLoading).toBe(false);
    expect(result.current.response.data).toEqual(pageItems);
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
