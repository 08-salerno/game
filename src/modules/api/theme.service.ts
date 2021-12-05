import { salernoEndpoint } from '../utils/constants';

const url = `${salernoEndpoint}/theme`;

export function loadUserTheme(userId: number): Promise<string> {
  return fetch(`${url}/${userId}`, {
    credentials: 'include',
  }).then((response) => response.text());
}

export function saveUserTheme(userId: number, theme: string): Promise<void> {
  return fetch(`${url}/${userId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: theme,
  }).then(() => Promise.resolve());
}
