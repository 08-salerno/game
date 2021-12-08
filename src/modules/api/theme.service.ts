import { salernoEndpoint } from '../utils/constants';

const url = `${salernoEndpoint}/theme`;

export function loadUserTheme(): Promise<string> {
  return fetch(`${url}`, {
    credentials: 'include',
  }).then((response) => response.text());
}

export function saveUserTheme(theme: string): Promise<void> {
  return fetch(`${url}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: theme,
  }).then(() => Promise.resolve());
}
