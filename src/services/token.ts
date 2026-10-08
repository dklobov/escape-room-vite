import {AUTH_TOKEN_KEY} from '../const';

function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
}

function saveToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function dropToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export {
  dropToken,
  getToken,
  saveToken,
};
