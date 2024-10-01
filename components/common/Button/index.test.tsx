import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('Button 컴포넌트', () => {
  it(`버튼에 '확인' 텍스트가 표시된다.`, () => {
    render(<Button>확인</Button>);

    const button = screen.getByRole('button');

    expect(button.textContent).toBe('확인');
  });

  it(`버튼 배경색이 bg-reverse 색상으로 표시된다.`, () => {
    render(<Button>확인</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveStyleRule(
      'background-color',
      'var(--color-bg-reverse)'
    );
  });

  it('버튼을 클릭하면 기능이 실행된다.', async () => {
    const mockFn = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={mockFn}>버튼</Button>);

    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);

    expect(button).toHaveFocus();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('disabled 상태면 클릭할 수 없다.', async () => {
    const mockFn = jest.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={mockFn}>
        버튼
      </Button>
    );

    const button = screen.getByRole('button');

    await user.click(button);

    expect(button).toBeDisabled();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
