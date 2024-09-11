import '@testing-library/jest-dom';
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
