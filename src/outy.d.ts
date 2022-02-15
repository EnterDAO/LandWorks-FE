/// <reference types="react-scripts" />

declare module 'outy' {
  export default function outy(
    nodes: HTMLElement[],
    types: (Event | MouseEvent | TouchEvent)[],
    eventHandler: () => void
  ): { remove: () => void };
}

export {};
