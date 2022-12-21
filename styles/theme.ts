import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  bgColor: {
    default: 'var(--color-theme-light-bg)',
    header: 'var(--color-theme-light-bg-header)',
    button: 'var(--color-black)'
  },
  color: {
    default: 'var(--color-black)',
    gray: 'var(--color-theme-light-gray)',
    button: 'var(--color-white)'
  },
  border: {
    gray: 'var(--color-theme-light-line-gray)',
    bookmark: 'var(--color-theme-light-line-bookmark)'
  }
};

export const dark: DefaultTheme = {
  bgColor: {
    default: 'var(--color-theme-dark-bg)',
    header: '--color-theme-dark-bg-header',
    button: 'var(--color-white)'
  },
  color: {
    default: 'var(--color-white)',
    gray: 'var(--color-theme-dark-gray)',
    button: 'var(--color-black)'
  },
  border: {
    gray: 'var(--color-theme-dark-line-gray)',
    bookmark: 'var(--color-theme-dark-line-bookmark)'
  }
};
