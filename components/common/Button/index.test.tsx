import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('Button 컴포넌트', () => {
  it('이벤트 동작 체크', async () => {
    const mockFn = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockFn}>버튼</Button>);

    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(button).toHaveFocus();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('disabled 동작 체크', () => {
    render(<Button disabled>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
