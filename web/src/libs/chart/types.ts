export interface Transform {
  x: (value: number) => number;
  y: (value: number) => number;
}

export interface Bounds {
  top: () => number;
  left: () => number;
  width: () => number;
  height: () => number;
}

export interface Tick {
  label: number;
  value: number;
  x: number;
  y: number;
}

export interface RawData {
  [key: string]: number | string;
}

export interface OHLC {
  rect: number[];
  line: {
    p0: number[];
    p1: number[];
  };
  color: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  current: Point;
  next: () => Point | null;
}

export type DataIterator<T> = {
  start: T;
  end: T;
  [Symbol.iterator](): Iterator<T>;
}