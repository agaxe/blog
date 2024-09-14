import { render, screen } from '@testing-library/react';
import { Loading } from '.';

describe('Loading 컴포넌트', () => {
  it('show', () => {
    render(<Loading isShow={true} />);

    const loadingContainer = screen.getByRole('loading', { hidden: true });

    expect(loadingContainer).toHaveStyle('visibility: visible');
  });

  it('hide', () => {
    render(<Loading isShow={false} />);

    const loadingContainer = screen.getByRole('loading', { hidden: true });

    expect(loadingContainer).toHaveStyle('visibility: hidden');
  });
});
