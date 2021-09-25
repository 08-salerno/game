import { Leader } from './types/leader';
import apiUrl from '../../modules/api/api-url';

const url = apiUrl('/leaderboard');

export const defaultQueryLimit = 25;

export const ratingFieldName = 'score';

export function saveScore(leader: Leader): Promise<void> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      data: leader,
      ratingFieldName,
    }),
  }).then(() => Promise.resolve());
}

export function getLeaderBord(offset: number = 0, limit: number = defaultQueryLimit): Promise<Leader[]> {
  return fetch(`${url}/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      ratingFieldName,
      cursor: offset,
      limit,
    }),
  }).then((response) => response.json())
    .then((datas: {data: Leader}[]) => {
      const leaders = datas.map(({ data }) => data);
      return Promise.resolve(leaders);
    });
}
