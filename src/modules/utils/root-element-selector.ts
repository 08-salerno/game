export default function rootElementSelector(): HTMLElement {
  const root = document.querySelector<HTMLElement>('#root');
  if (root) {
    return root;
  }
  throw new Error('root элемент не найден');
}
