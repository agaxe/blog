import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSWR from 'swr';
import notionPageItems from '@/mocks/notionPageItems';
import pageItems from '@/mocks/parsePageItems';
import { Search } from '.';
import { useSearch } from './hooks/useSearch';

jest.mock('swr');
jest.useFakeTimers();

const openModalAssert = async () => {
  const user = userEvent.setup({ delay: null });

  render(<Search />, { wrapper: MemoryRouterProvider });

  const modalShowButton = screen.getByRole('button');

  await user.click(modalShowButton);

  const input = screen.queryByPlaceholderText('Search');
  expect(input).toBeInTheDocument;

  return { user };
};

describe('Search 컴포넌트', () => {
  describe('기본 동작 체크', () => {
    beforeAll(() => {
      (useSWR as jest.Mock).mockReturnValue({
        data: notionPageItems,
        isLoading: false,
        error: null
      });
    });

    it('검색 아이콘 버튼 클릭 시 모달이 활성화된다.', async () => {
      await openModalAssert();
    });

    it('모달이 활성화되면 검색 input 이 focus 된다.', async () => {
      await openModalAssert();

      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveFocus();
    });

    it('검색 input 에 값을 입력하면 value 가 변경된다.', async () => {
      const { user } = await openModalAssert();

      const input = screen.getByPlaceholderText('Search');

      await user.type(input, 'test');

      expect(input).toHaveValue('test');
    });
  });

  describe(`검색 API 의 상태값이 '성공'인 경우`, () => {
    beforeAll(() => {
      (useSWR as jest.Mock).mockReturnValue({
        data: notionPageItems,
        isLoading: false,
        error: null
      });
    });

    it('useSearch 반환 값 체크', async () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.response.isLoading).toBe(false);
      expect(result.current.response.data).toEqual(pageItems);
    });

    it('검색 결과 리스트가 표시된다.', async () => {
      await openModalAssert();

      const searchResultList = screen.queryByRole('list');

      expect(searchResultList).toBeInTheDocument;
    });

    it('검색 결과 리스트의 아이템이 표시된다.', async () => {
      await openModalAssert();

      const searchResultListItems = screen.queryAllByRole('listitem');

      expect(searchResultListItems).toHaveLength(10);
    });

    it('검색 결과 아이템을 클릭하면 해당 포스트의 상세 페이지로 이동한다.', async () => {
      const { user } = await openModalAssert();

      const searchResultListItems = screen.queryAllByRole('listitem');
      const itemLink1 = searchResultListItems[0].querySelector('a');

      await user.click(itemLink1 as HTMLElement);

      expect(mockRouter.asPath).toEqual('/c9d287d36ecc476a9c4ec9d8b98c9a6e');
    });
  });

  describe(`검색 API 의 상태값이 '로딩'인 경우`, () => {
    beforeAll(() => {
      (useSWR as jest.Mock).mockReturnValue({
        data: [],
        isLoading: true,
        error: null
      });
    });

    it('useSearch 반환 값 체크', async () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.response.isLoading).toBe(true);
      expect(result.current.response.data).toEqual([]);
    });

    it(`'로딩중' 아이콘이 표시된다.`, async () => {
      await openModalAssert();

      const searchLoadingIcon = screen.queryByTestId('search-loading-icon');

      expect(searchLoadingIcon).toBeInTheDocument;
    });
  });

  describe(`검색 API 의 상태값이 '결과 없음'인 경우`, () => {
    beforeAll(() => {
      (useSWR as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
        error: null
      });
    });

    it('useSearch 반환 값 체크', async () => {
      const { result } = renderHook(() => useSearch());

      expect(result.current.response.isLoading).toBe(false);
      expect(result.current.response.data).toEqual([]);
    });

    it(`'검색 결과 없음' 텍스트가 표시된다.`, async () => {
      await openModalAssert();

      const notFoundResultText = screen.queryByText('검색 결과가 없습니다 :(');

      expect(notFoundResultText).toBeInTheDocument;
    });
  });
});
