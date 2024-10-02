import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotionTagItem } from '.';

const defaultMockProps = {
  className: 'test-classname',
  name: 'tag name',
  isLink: true,
  color: 'default',
  size: 'lg'
} as const;

describe('NotionTagItem 컴포넌트', () => {
  it('태그 아이템이 표시된다.', () => {
    render(<NotionTagItem {...defaultMockProps} />);

    const tagItem = screen.getByTestId('notion-tag-item');

    expect(tagItem).toBeInTheDocument;
  });

  it('태그 아이템의 배경 색상이 분홍색으로 표시된다.', () => {
    const props = {
      ...defaultMockProps,
      color: 'pink'
    };
    render(<NotionTagItem {...props} />);

    const tagItem = screen.getByTestId('notion-tag-item');

    expect(tagItem).toHaveClass('notion-item-pink');
  });

  it('태그 이름이 표시된다.', () => {
    const props = {
      ...defaultMockProps,
      name: 'test tag name'
    };
    render(<NotionTagItem {...props} />);

    const tagNameText = screen.getByRole('paragraph');

    expect(tagNameText).toHaveTextContent('Test Tag Name');
  });

  it('해당 태그의 포스트 수가 표시되지 않는다.', () => {
    render(<NotionTagItem {...defaultMockProps} />);

    const tagItem = screen.getByTestId('notion-tag-item');
    const tagCountText = tagItem?.querySelector('span');

    expect(tagCountText).not.toBeInTheDocument();
  });

  it('해당 태그의 포스트 수가 표시된다.', () => {
    const props = {
      ...defaultMockProps,
      count: 10
    };
    render(<NotionTagItem {...props} />);

    const tagCountText = screen.getByText('(10)');

    expect(tagCountText).toBeInTheDocument();
  });

  it('링크 활성화 시 태그를 클릭하면 해당 태그의 포스트 리스트 페이지로 이동한다.', async () => {
    const user = userEvent.setup();

    const props = {
      ...defaultMockProps,
      name: 'test tag name'
    };
    render(<NotionTagItem {...props} />, {
      wrapper: MemoryRouterProvider
    });

    const tagLink = screen.queryByRole('link');

    if (tagLink) await user.click(tagLink);

    expect(mockRouter.asPath).toEqual('/tags/test-tag-name/pages/1');
  });

  it('링크 비활성화 시 a 태그가 표시되지 않는다.', () => {
    const props = {
      ...defaultMockProps,
      isLink: false
    };
    render(<NotionTagItem {...props} />);
    const tagLink = screen.queryByRole('link');

    expect(tagLink).not.toBeInTheDocument();
  });
});
