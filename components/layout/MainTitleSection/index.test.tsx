import { render, screen } from '@testing-library/react';
import { MainTitleSection } from '.';

describe('MainTitleSection 컴포넌트', () => {
  it('타이틀 영역에 타이틀 정보가 표시된다.', () => {
    render(<MainTitleSection />);

    const title = screen.getByRole('heading', { level: 3 });

    expect(title).toHaveTextContent('Agaxe');
  });

  it('설명글 영역에 설명글 정보가 표시된다.', () => {
    render(<MainTitleSection />);

    const description = screen.getByRole('paragraph');

    expect(description).toHaveTextContent(
      '쉽게 얻은 것은 쉽게 잃지만 어렵게 얻은 것은 더 가치 있게 유지된다.'
    );
  });

  it('깃허브, 메일 링크가 존재한다.', () => {
    render(<MainTitleSection />);
    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    const [githubLink, emailLink] = screen.getAllByRole('link');

    expect(list).toBeInTheDocument;

    expect(items).toHaveLength(2);

    expect(githubLink).toHaveAttribute('href', 'https://github.com/agaxe');
    expect(emailLink).toHaveAttribute('href', 'mailto:agaxe.dev@gmail.com');
  });
});
