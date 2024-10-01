import { render, screen } from '@testing-library/react';
import { Footer } from '.';

jest.mock('@/config', () => ({
  name: 'config-name'
}));

describe('Footer 컴포넌트', () => {
  it('config 에 설정한 name 정보가 표시된다.', async () => {
    render(<Footer />);

    const footerTextElement = screen.getByText(`© config-name`);

    expect(footerTextElement).toBeInTheDocument();
  });
});
