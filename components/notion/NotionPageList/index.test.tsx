import React from 'react';
import { render } from '@testing-library/react';
import parsePageItems from '@/mocks/parsePageItems';
import { NotionPageList } from '.';

describe('NotionPageList 컴포넌트', () => {
  it('데이터가 존재하면 포스트 아이템이 표시된다.', () => {
    render(<NotionPageList data={parsePageItems} listHeight={400} />);

    const pageList = document.querySelectorAll('ul')[0];
    const pageItems = pageList.querySelectorAll(':scope > li');

    expect(pageItems).toHaveLength(10);
  });

  it('데이터가 존재하지 않으면 포스트 아이템이 표시되지 않는다.', () => {
    render(<NotionPageList data={[]} listHeight={400} />);

    const pageList = document.querySelectorAll('ul')[0];
    const pageItems = pageList.querySelectorAll(':scope > li');

    expect(pageItems).toHaveLength(0);
  });
});
