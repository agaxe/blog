import { render, screen } from '@testing-library/react';
import { MainHeader } from '.';

describe('MainHeader 컴포넌트', () => {
  it('텍스트 정보 체크', () => {
    render(<MainHeader />);

    const title = screen.getByRole('heading', { level: 3 });
    const description = screen.getByRole('paragraph');

    expect(title).toHaveTextContent('Agaxe');
    expect(description).toHaveTextContent(
      '쉽게 얻은 것은 쉽게 잃지만 어렵게 얻은 것은 더 가치 있게 유지된다.'
    );
  });

  it('관련 링크 리스트 체크', () => {
    render(<MainHeader />);
    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    const [githubLink, emailLink] = screen.getAllByRole('link');

    expect(list).toBeInTheDocument;

    expect(items).toHaveLength(2);

    expect(githubLink).toHaveAttribute('href', 'https://github.com/agaxe');
    expect(emailLink).toHaveAttribute('href', 'mailto:agaxe.dev@gmail.com');
  });
});
