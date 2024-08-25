import { describe, expect, it } from '@jest/globals';
import { convertUuidToPostId } from '../convertUuidToPostId';

describe('convertUuidToPostId', () => {
  it('default', () => {
    const uuid = '84fd1842-99ac-454f-b917-730b587ddbdd';

    expect(convertUuidToPostId(uuid)).toBe('84fd184299ac454fb917730b587ddbdd');
  });
});
