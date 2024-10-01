import '@testing-library/jest-dom';
import 'jest-styled-components';
import mockNotionClient from '@/mocks/notionClient';
import MockNotionHqClient from '@/mocks/notionHqClient';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

jest.mock('@/lib/notion/config', () => {
  return {
    notionClient: mockNotionClient,
    notionHqClient: new MockNotionHqClient()
  };
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
