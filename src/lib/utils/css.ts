import { CSSProperties } from "react";

export const pixellate = (value: number) => {
  return `${value}px`;
};

export const setCSS = (element: HTMLElement, css: CSSProperties) => {
  Object.assign(element.style, css);
};
