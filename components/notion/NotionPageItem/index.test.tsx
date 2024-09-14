import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import parsePageItems from '@/mocks/parsePageItems';
import { NotionPageItem } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('NotionPageItem 컴포넌트', () => {
  it('기본 props 체크', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <NotionPageItem data={parsePageItems[0]} />
    );

    const title = getByRole('heading', { level: 3 });
    const dateText = getByText('2024년 4월 29일');
    const tagList = getByRole('list');
    const tagItems = getAllByRole('listitem');
    const [tagItem1, tagItem2] = tagItems;

    const tag1 = tagItem1.querySelector('.notion-property-multi_select-item');
    const tag2 = tagItem2.querySelector('.notion-property-multi_select-item');

    expect(title).toHaveTextContent('포스트 제목_1');
    expect(dateText).toHaveRole('paragraph');
    expect(tagList).toBeInTheDocument;
    expect(tagItems).toHaveLength(2);

    expect(tagItem1).toHaveTextContent('Tag Name_1-1');
    expect(tagItem2).toHaveTextContent('Tag Name_1-2');

    expect(tag1).toHaveClass('notion-item-default');
    expect(tag2).toHaveClass('notion-item-pink');
  });

  it('링크 클릭 이벤트', () => {
    render(<NotionPageItem data={parsePageItems[0]} />, {
      wrapper: MemoryRouterProvider
    });

    const itemLink = document.querySelector(
      `a[href='/c9d287d36ecc476a9c4ec9d8b98c9a6e'`
    ) as Element;

    fireEvent.click(itemLink);

    expect(mockRouter.asPath).toEqual(`/c9d287d36ecc476a9c4ec9d8b98c9a6e`);
  });

  it('isCompleted 활성화', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const completBox = screen.queryByTestId('complete-box');

    expect(completBox).not.toBeInTheDocument;
  });

  it('isCompleted 비활성화', () => {
    render(
      <NotionPageItem data={{ ...parsePageItems[0], isCompleted: false }} />
    );

    const completBox = screen.getByTestId('complete-box');

    expect(completBox).toBeInTheDocument;
  });
});
