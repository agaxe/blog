import { describe, expect, it } from '@jest/globals';
import { convertPascalCase } from '../convertPascalCase';

describe('convertPascalCase', () => {
  it('lower case', () => {
    expect(convertPascalCase('example text')).toBe('Example Text');
  });

  it('upper case', () => {
    expect(convertPascalCase('EXAMPLE TEXT')).toBe('Example Text');
  });
});
