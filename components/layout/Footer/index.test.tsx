import config from '@/config';
import { render, screen } from '@testing-library/react';
import { Footer } from '.';

describe('Footer 컴포넌트', () => {
  it('default', async () => {
    render(<Footer />);

    const footerTextElement = screen.getByText(`© ${config.name}`);

    expect(footerTextElement).toBeInTheDocument();
  });
});
