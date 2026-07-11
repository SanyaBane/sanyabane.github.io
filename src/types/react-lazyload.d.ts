// Minimal type declarations for `react-lazyload`, which ships no types of its own.
// Covers the subset of the API this project uses; extend as needed.
declare module "react-lazyload" {
  import { Component, ReactNode } from "react";

  interface LazyLoadProps {
    children?: ReactNode;
    className?: string;
    height?: number | string;
    once?: boolean;
    offset?: number | number[];
    overflow?: boolean;
    placeholder?: ReactNode;
    resize?: boolean;
    scroll?: boolean;
    throttle?: number | boolean;
    debounce?: number | boolean;
    unmountIfInvisible?: boolean;
  }

  export default class LazyLoad extends Component<LazyLoadProps> {}
  export function forceCheck(): void;
}
