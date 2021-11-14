const scoreMap: Record<number, number> = {
  3: 100,
  4: 200,
  5: 400,
};

const minMatch = Math.min(...Object.keys(scoreMap).map((key) => Number(key)));
const maxMatch = Math.max(...Object.keys(scoreMap).map((key) => Number(key)));

export default function countScore(matchLength: number): number {
  if (matchLength < minMatch) {
    return 0;
  }

  if (matchLength > maxMatch) {
    return scoreMap[maxMatch];
  }

  return scoreMap[matchLength];
}
