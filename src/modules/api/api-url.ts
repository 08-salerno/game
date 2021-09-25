const url = 'https://ya-praktikum.tech/api/v2';

export default function apiUrl(endPoint: string): string {
  if (endPoint[0] !== '/') {
    throw new Error('Добавь слэш "/"');
  }
  return `${url}${endPoint}`;
}
