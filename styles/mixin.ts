import { css } from 'styled-components';

interface loadingSpinnerStyleParams {
  size: string;
  borderWidth?: number;
  color: string;
  bgColor: string;
}
export const loadingSpinnerStyle = (styles: loadingSpinnerStyleParams) => {
  const { size, borderWidth = 3, color, bgColor } = styles;

  return css`
    width: ${size};
    height: ${size};
    border: ${borderWidth}px solid ${bgColor};
    border-top-color: ${color};
    box-sizing: border-box;
    border-radius: 50%;
    @keyframes spinner {
      to {
        transform: rotate(360deg);
      }
    }
    animation: spinner 0.8s linear infinite;
  `;
};
