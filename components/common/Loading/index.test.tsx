import { render, screen } from '@testing-library/react';
import { Loading } from '.';

describe('Loading 컴포넌트', () => {
  it('활성화 상태인 경우 화면에 표시된다.', () => {
    render(<Loading isShow={true} />);

    const loadingContainer = screen.getByRole('loading', { hidden: true });

    expect(loadingContainer).toHaveStyle('visibility: visible');
  });

  it('비활성화 상태인 경우 화면에 표시되지 않는다.', () => {
    render(<Loading isShow={false} />);

    const loadingContainer = screen.getByRole('loading', { hidden: true });

    expect(loadingContainer).toHaveStyle('visibility: hidden');
  });
});
