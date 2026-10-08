import type {State} from '..';

function getAuthorizationStatus(state: State) {
  return state.user.authorizationStatus;
}

function getUserEmail(state: State) {
  return state.user.userEmail;
}

export {
  getAuthorizationStatus,
  getUserEmail,
};
