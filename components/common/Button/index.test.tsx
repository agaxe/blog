import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button 컴포넌트', () => {
  it('이벤트 동작 체크', () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn}>버튼</Button>);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('disabled 동작 체크', () => {
    render(<Button disabled>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
