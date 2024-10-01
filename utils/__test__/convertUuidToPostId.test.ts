import { convertUuidToPostId } from '../convertUuidToPostId';

describe('utils/convertUuidToPostId', () => {
  it('UUID 를 받으면 하이픈(-) 을 제거한다.', () => {
    const uuid = '84fd1842-99ac-454f-b917-730b587ddbdd';

    expect(convertUuidToPostId(uuid)).toBe('84fd184299ac454fb917730b587ddbdd');
  });
});
