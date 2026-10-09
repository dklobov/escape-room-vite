import {describe, expect, it} from 'vitest';

import {AuthorizationStatus} from '../../const';
import {
  setAuthorizationStatus,
  setUserEmail,
  userProcess,
} from './user-process';

describe('UserProcess reducer', () => {
  it('should set authorization status', () => {
    const state = userProcess.reducer(
      undefined,
      setAuthorizationStatus(AuthorizationStatus.Authorized)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Authorized);
  });

  it('should set user email', () => {
    const state = userProcess.reducer(
      undefined,
      setUserEmail('test-user@htmlacademy.ru')
    );

    expect(state.userEmail).toBe('test-user@htmlacademy.ru');
  });
});
