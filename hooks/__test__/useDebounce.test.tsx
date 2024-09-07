import { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen
} from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

const TestComp = ({ delay = 10000 }: { delay?: number }) => {
  const [value, setValue] = useState('');
  const [valueResult, setValueResult] = useState('');
  const debounce = useDebounce();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);

    debounce(() => {
      setValueResult(value);
    }, delay);
  };

  return (
    <>
      <input data-testid='input' value={value} onChange={handleChangeInput} />
      <p data-testid='value'>{`${valueResult}`}</p>
    </>
  );
};

describe('hooks/useDebounce', () => {
  it('함수 실행 테스트', () => {
    const mockFnForTrue = jest.fn();
    const mockFnForFalse = jest.fn();
    const { result } = renderHook(() => useDebounce());
    const debounce = result.current;

    for (let i = 0; i < 10; i++) {
      debounce(() => {
        mockFnForTrue();
      }, 1000);

      jest.advanceTimersByTime(1000);
    }

    for (let i = 0; i < 10; i++) {
      debounce(() => {
        mockFnForFalse();
      }, 1000);
    }

    expect(mockFnForTrue).toHaveBeenCalledTimes(10);
    expect(mockFnForFalse).not.toHaveBeenCalledTimes(10);
  });

  it('input 값 변경 테스트', () => {
    render(<TestComp />);

    const input = screen.getByTestId('input');
    const value = screen.getByTestId('value');

    act(() => {
      for (let i = 0; i <= 50; i++) {
        fireEvent.change(input, { target: { value: i } });
      }

      expect(value).toHaveTextContent('');

      jest.runAllTimers();
    });

    expect(value).toHaveTextContent('50');
  });
});
