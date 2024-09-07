import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { fireEvent, render, screen } from '@testing-library/react';
import { NotionPageItem } from '.';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

type Props = React.ComponentProps<typeof NotionPageItem>['data'];

const mockProps: Props = {
  koId: '포스트-제목-1c899e468f19435b82b5bbbd2c531d8f',
  id: '1c899e468f19435b82b5bbbd2c531d8f',
  title: '포스트 제목',
  tags: [
    {
      id: '242c1663-df78-4ac0-9278-ae865b5c44eb',
      name: 'Tag1',
      color: 'blue'
    },
    {
      id: 'd99119ec-0e05-4830-96c8-bef3570bdd44',
      name: 'Tag2',
      color: 'yellow'
    }
  ],
  createdAt: '2023-04-18T03:54:00.000Z',
  isCompleted: true
};

describe('NotionPageItem 컴포넌트', () => {
  it('기본 props 체크', () => {
    const { getByRole, getByText, getAllByRole } = render(
      <NotionPageItem data={mockProps} />
    );

    const title = getByRole('heading', { level: 3 });
    const dateText = getByText('2023년 4월 18일');
    const tagList = getByRole('list');
    const tagItems = getAllByRole('listitem');
    const [tagItem1, tagItem2] = tagItems;

    const tag1 = tagItem1.querySelector('.notion-property-multi_select-item');
    const tag2 = tagItem2.querySelector('.notion-property-multi_select-item');

    expect(title).toHaveTextContent('포스트 제목');
    expect(dateText).toHaveRole('paragraph');
    expect(tagList).toBeInTheDocument;
    expect(tagItems).toHaveLength(2);

    expect(tagItem1).toHaveTextContent('Tag1');
    expect(tagItem2).toHaveTextContent('Tag2');

    expect(tag1).toHaveClass('notion-item-blue');
    expect(tag2).toHaveClass('notion-item-yellow');
  });

  it('링크 클릭 이벤트', () => {
    const { container } = render(<NotionPageItem data={mockProps} />, {
      wrapper: MemoryRouterProvider
    });

    const itemLink = container.querySelector(
      `a[href='/1c899e468f19435b82b5bbbd2c531d8f'`
    ) as Element;

    fireEvent.click(itemLink);

    expect(mockRouter.asPath).toEqual(`/1c899e468f19435b82b5bbbd2c531d8f`);
  });

  it('isCompleted 활성화', () => {
    render(<NotionPageItem data={mockProps} />);

    const completBox = screen.queryByTestId('complete-box');

    expect(completBox).not.toBeInTheDocument;
  });

  it('isCompleted 비활성화', () => {
    render(<NotionPageItem data={{ ...mockProps, isCompleted: false }} />);

    const completBox = screen.getByTestId('complete-box');

    expect(completBox).toBeInTheDocument;
  });
});
