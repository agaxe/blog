import { render, screen } from '@testing-library/react';
import tagsWithCnt from '@/mocks/tagsWithCnt';
import { TagList } from '.';

describe('TagList 컴포넌트', () => {
  it('태그 리스트가 존재한다.', () => {
    render(<TagList tags={tagsWithCnt} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument;
  });

  it('태그 아이템이 데이터 개수인 2개가 존재한다.', () => {
    render(<TagList tags={tagsWithCnt} />);

    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(2);
  });

  it('PascalCase 형식의 태그 이름이 표시된다.', () => {
    render(<TagList tags={tagsWithCnt} />);

    const tagName = screen.getAllByRole('paragraph');

    expect(tagName[0].textContent).toBe('Test1');
    expect(tagName[1].textContent).toBe('Test Name');
  });

  it('해당 태그의 포스트 수가 표시된다.', () => {
    render(<TagList tags={tagsWithCnt} />);

    const tagCnt = document.querySelectorAll('span');

    expect(tagCnt[0].textContent).toBe('(1)');
    expect(tagCnt[1].textContent).toBe('(5)');
  });
});
