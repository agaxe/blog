import { convertPascalCase } from '../convertPascalCase';

describe('utils/convertPascalCase', () => {
  it('lower case 텍스트를 pascal case 로 변환시킨다.', () => {
    expect(convertPascalCase('example text')).toBe('Example Text');
  });

  it('upper case 텍스트를 pascal case 로 변환시킨다.', () => {
    expect(convertPascalCase('EXAMPLE TEXT')).toBe('Example Text');
  });
});
