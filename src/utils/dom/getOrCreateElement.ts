export default function getOrCreateElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  id: string,
  parent: Element = document.body,
  prepend: boolean = false
): HTMLElementTagNameMap[T] {
  let element = parent.querySelector(`#${id}`) as HTMLElementTagNameMap[T];

  if (!element) {
    element = document.createElement(tagName);
    element.id = `${id}`;
    parent[prepend ? 'prepend' : 'appendChild'](element);
  }

  return element;
}
