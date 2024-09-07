import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { useRefCurrent } from '@/hooks/useRefCurrent';

Object.defineProperties(HTMLElement.prototype, {
  clientHeight: { get: () => 120, configurable: true }
});

const TestComp = () => {
  const [boxHeight, setBoxHeight] = useState(0);
  const { ref } = useRefCurrent<HTMLDivElement>((current) => {
    setBoxHeight(current.clientHeight);
  });

  return (
    <div ref={ref}>
      <p data-testid='element'>{boxHeight}</p>
    </div>
  );
};

describe('hooks/useRefCurrent', () => {
  it('current 확인', () => {
    render(<TestComp />);

    const elementHeight = screen.getByTestId('element').innerHTML;

    expect(elementHeight).toBe('120');
  });
});
