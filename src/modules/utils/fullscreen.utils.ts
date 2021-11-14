export function exitFullscreen(): void {
  // todo [sitnik] возможная ошибка SSR
  document.exitFullscreen().then(() => {}).catch(() => {});
}
