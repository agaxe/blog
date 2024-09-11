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
    const { container } = render(<Seo />);

    const title = container.querySelector('title');
    const description = container.querySelector('meta[name="description"');
    const image = container.querySelector('meta[name="image"');

    expect(title?.textContent).toBe('[default] 페이지 타이틀');
    expect(description).toHaveAttribute('content', '[default] 페이지 설명글');
    expect(image).toHaveAttribute('content', '/images/og_img.jpg');
  });

  it('title 체크', () => {
    const { container } = render(<Seo title='페이지 타이틀' />);

    const title = container.querySelector('title');
    const ogTitle = container.querySelector('meta[property="og:title"');

    expect(title?.textContent).toBe('페이지 타이틀');
    expect(ogTitle).toHaveAttribute('content', '페이지 타이틀');
  });

  it('description 체크', () => {
    const { container } = render(<Seo description='페이지 설명글' />);

    const description = container.querySelector('meta[name="description"');
    const ogDescription = container.querySelector(
      'meta[property="og:description"'
    );

    expect(description).toHaveAttribute('content', '페이지 설명글');
    expect(ogDescription).toHaveAttribute('content', '페이지 설명글');
  });

  it('image 체크', () => {
    const { container } = render(<Seo img_url='/images/test-og-img.jpg' />);

    const linkImage = container.querySelector('link[rel="image_src"');
    const image = container.querySelector('meta[name="image"]');
    const ogImage = container.querySelector('meta[property="og:image"');

    expect(linkImage).toHaveAttribute('href', '/images/test-og-img.jpg');
    expect(image).toHaveAttribute('content', '/images/test-og-img.jpg');
    expect(ogImage).toHaveAttribute('content', '/images/test-og-img.jpg');
  });
});
