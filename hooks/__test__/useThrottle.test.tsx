import { useState } from 'react';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useThrottle } from '../useThrottle';

jest.useFakeTimers();

const TestComp = ({ delay = 10000 }: { delay?: number }) => {
  const [value, setValue] = useState('');
  const [valueResult, setValueResult] = useState('');
  const throttle = useThrottle();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);

    throttle(() => {
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

describe('hooks/useThrottle', () => {
  it('함수 실행 테스트', async () => {
    const mockFnForTrue = jest.fn();
    const mockFnForFalse = jest.fn();
    const { result } = renderHook(() => useThrottle());
    const throttle = result.current;

    for (let i = 0; i < 10; i++) {
      throttle(() => {
        mockFnForTrue();
      }, 10000);

      jest.advanceTimersByTime(10000);
    }

    for (let i = 0; i < 10; i++) {
      throttle(() => {
        mockFnForFalse();
      }, 10000);
    }

    expect(mockFnForTrue).toHaveBeenCalledTimes(10);
    expect(mockFnForFalse).not.toHaveBeenCalledTimes(10);
  });

  it('input 값 변경 테스트', () => {
    render(<TestComp />);

    const input = screen.getByTestId('input');
    const value = screen.getByTestId('value');

    for (let i = 0; i <= 50; i++) {
      fireEvent.change(input, { target: { value: i } });
      jest.advanceTimersByTime(10000);
    }

    expect(value).toHaveTextContent('50');
  });
});
