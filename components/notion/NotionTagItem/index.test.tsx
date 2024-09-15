import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotionTagItem } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const defaultMockProps = {
  className: 'test-classname',
  name: 'tag name',
  isLink: true,
  color: 'pink',
  size: 'large'
} as const;

describe('NotionTagItem 컴포넌트', () => {
  it('기본 props 체크', () => {
    render(<NotionTagItem {...defaultMockProps} />);

    const tagItem = document.querySelector('.test-classname');
    const tagLink = document.querySelector('a');
    const tagNameText = tagItem?.querySelector('p:first-child');
    const tagCountText = tagItem?.querySelector('p:last-child');

    expect(tagLink).toBeInTheDocument;

    expect(tagItem).toBeInTheDocument;
    expect(tagItem).toHaveStyle('font-size: 16px');
    expect(tagItem).toHaveClass('notion-item-pink');

    expect(tagNameText).toHaveTextContent('Tag Name');
    expect(tagCountText).not.toHaveTextContent('(10)');
  });

  it('count 표시', () => {
    render(
      <NotionTagItem
        {...{
          ...defaultMockProps,
          count: 10
        }}
      />
    );

    const tagItem = document.querySelector('.test-classname');
    const tagCountText = tagItem?.querySelector('p:last-child');

    expect(tagCountText).toHaveTextContent('(10)');
  });

  it('링크 비활성화', () => {
    render(
      <NotionTagItem
        {...{
          ...defaultMockProps,
          isLink: false
        }}
      />
    );

    const tagLink = document?.querySelector('a');

    expect(tagLink).not.toBeInTheDocument;
  });

  it('링크 클릭 시 태그 페이지로 이동', async () => {
    const user = userEvent.setup();

    render(<NotionTagItem {...defaultMockProps} />, {
      wrapper: MemoryRouterProvider
    });

    const tagLink = document?.querySelector('a') as HTMLAnchorElement;

    await user.click(tagLink);

    expect(mockRouter.asPath).toEqual('/tags/tag%20name/pages/1');
  });
});
