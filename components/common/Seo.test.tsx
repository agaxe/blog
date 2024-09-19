import { render } from '@testing-library/react';
import { Seo } from './Seo';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    }
  };
});

jest.mock('@/config', () => ({
  site: {
    title: '[default] 페이지 타이틀',
    description: '[default] 페이지 설명글'
  }
}));

describe('Seo 컴포넌트', () => {
  it('props 기본값 체크', () => {
    render(<Seo />);

    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"');
    const image = document.querySelector('meta[name="image"');

    expect(title?.textContent).toBe('[default] 페이지 타이틀');
    expect(description).toHaveAttribute('content', '[default] 페이지 설명글');
    expect(image).toHaveAttribute('content', '/images/og_img.jpg');
  });

  it('title 체크', () => {
    render(<Seo title='페이지 타이틀' />);

    const title = document.querySelector('title');
    const ogTitle = document.querySelector('meta[property="og:title"');

    expect(title?.textContent).toBe('페이지 타이틀');
    expect(ogTitle).toHaveAttribute('content', '페이지 타이틀');
  });

  it('description 체크', () => {
    render(<Seo description='페이지 설명글' />);

    const description = document.querySelector('meta[name="description"');
    const ogDescription = document.querySelector(
      'meta[property="og:description"'
    );

    expect(description).toHaveAttribute('content', '페이지 설명글');
    expect(ogDescription).toHaveAttribute('content', '페이지 설명글');
  });

  it('image 체크', () => {
    render(<Seo imgUrl='/images/test-og-img.jpg' />);

    const linkImage = document.querySelector('link[rel="image_src"');
    const image = document.querySelector('meta[name="image"]');
    const ogImage = document.querySelector('meta[property="og:image"');

    expect(linkImage).toHaveAttribute('href', '/images/test-og-img.jpg');
    expect(image).toHaveAttribute('content', '/images/test-og-img.jpg');
    expect(ogImage).toHaveAttribute('content', '/images/test-og-img.jpg');
  });
});
