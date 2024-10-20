import { render, screen } from '@testing-library/react';
import { Footer } from '.';

jest.mock('@/config', () => ({
  name: 'nickname'
}));

describe('Footer 컴포넌트', () => {
  it('현재 년도와 닉네임을 포함한 저작권 텍스트가 표시된다.', async () => {
    render(<Footer />);

    const footerTextElement = screen.getByRole('paragraph');

    expect(footerTextElement).toHaveTextContent(`${new Date().getFullYear()}`);
    expect(footerTextElement).toHaveTextContent('Nickname');
  });
});
