import { User } from './types';

const url = 'https://ya-praktikum.tech/api/v2';

export function apiUrl(endPoint: string): string {
  if (endPoint[0] !== '/') {
    throw new Error('Добавь слэш "/"');
  }
  return `${url}${endPoint}`;
}

export function asUser(value: unknown): User {
  return value as User;
}
