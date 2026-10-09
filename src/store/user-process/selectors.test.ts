import {describe, expect, it} from 'vitest';

import {AuthorizationStatus} from '../../const';
import {makeState} from '../../test-utils/mock-state';
import {
  getAuthorizationStatus,
  getUserEmail,
} from './selectors';

describe('User selectors', () => {
  it('should return authorization status', () => {
    const state = makeState({
      user: {
        authorizationStatus: AuthorizationStatus.Authorized,
        userEmail: '',
      },
    });

    expect(getAuthorizationStatus(state)).toBe(AuthorizationStatus.Authorized);
  });

  it('should return user email', () => {
    const state = makeState({
      user: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: 'test-user@htmlacademy.ru',
      },
    });

    expect(getUserEmail(state)).toBe('test-user@htmlacademy.ru');
  });
});
