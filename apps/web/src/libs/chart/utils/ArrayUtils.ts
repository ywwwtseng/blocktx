export class ArrayUtils {
  static binarySearch<T extends { [key: string]: number | string }>(
    array: T[], 
    target: number, 
    attribute: keyof T
  ): number {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (array[mid][attribute] as number < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return left;
  }

  static lowHigh<T extends { [key: string]: number | string }>(
    array: T[],
    attributes: string | string[]
  ): number[] {
    if (typeof attributes === "string") {
      attributes = [attributes, attributes];
    }
    
    return array.reduce((acc: number[], item: T) => {
      if (acc[0] === undefined || Number(item[attributes[0] as keyof T]) < acc[0]) {
        acc[0] = Number(item[attributes[0] as keyof T]);
      }
      if (acc[1] === undefined || Number(item[attributes[1] as keyof T]) > acc[1]) {
        acc[1] = Number(item[attributes[1] as keyof T]);
      }
      return acc;
    }, []);
  }
}
