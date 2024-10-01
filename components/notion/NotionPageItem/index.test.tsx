import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import parsePageItems from '@/mocks/parsePageItems';
import { NotionPageItem } from '.';

describe('NotionPageItem 컴포넌트', () => {
  it('포스트 제목이 표시된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const title = screen.getByRole('heading', {
      level: 3,
      name: '포스트 제목_1'
    });

    expect(title).toBeInTheDocument;
  });

  it('포스트 작성일이 표시된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const dateText = screen.getByText('2024년 4월 29일');

    expect(dateText).toBeInTheDocument;
  });

  it('태그 리스트가 표시된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const tagList = screen.getByRole('list');

    expect(tagList).toBeInTheDocument;
  });

  it('태그 아이템이 데이터 개수인 2개가 표시된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const tagItems = screen.getAllByRole('listitem');

    expect(tagItems).toHaveLength(2);
  });

  it('태그 아이템에 태그 이름이 표시된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const tagItems = screen.getAllByRole('listitem');
    const tagText1 = tagItems[0].querySelector('p') as HTMLParagraphElement;
    const tagText2 = tagItems[1].querySelector('p') as HTMLParagraphElement;

    expect(tagText1.textContent).toBe('Tag Name_1-1');
    expect(tagText2.textContent).toBe('Tag Name_1-2');
  });

  it('태그 아이템마다 배경색이 설정된다.', () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const tagItems = screen.getAllByRole('listitem');
    const [tagItem1, tagItem2] = tagItems;

    const tag1 = tagItem1.querySelector('.notion-property-multi_select-item');
    const tag2 = tagItem2.querySelector('.notion-property-multi_select-item');

    expect(tag1).toHaveClass('notion-item-default');
    expect(tag2).toHaveClass('notion-item-pink');
  });

  it('포스트 아이템 클릭 시 해당 포스트 상세 페이지로 이동한다.', async () => {
    const user = userEvent.setup();

    render(<NotionPageItem data={parsePageItems[0]} />, {
      wrapper: MemoryRouterProvider
    });

    const itemLink = document.querySelector(
      `a[href='/c9d287d36ecc476a9c4ec9d8b98c9a6e'`
    ) as Element;

    await user.click(itemLink);

    expect(mockRouter.asPath).toEqual(`/c9d287d36ecc476a9c4ec9d8b98c9a6e`);
  });

  it(`작성 완료 포스트의 경우 '작성중' 표시가 표시되지 않는다.`, () => {
    render(<NotionPageItem data={parsePageItems[0]} />);

    const completBox = document.querySelector('complete-box');

    expect(completBox).not.toBeInTheDocument;
  });

  it(`작성 미완료 포스트의 경우 '작성중' 표시가 표시된다.`, () => {
    render(
      <NotionPageItem data={{ ...parsePageItems[0], isCompleted: false }} />
    );

    const completBox = document.querySelector('complete-box');

    expect(completBox).toBeInTheDocument;
  });
});
