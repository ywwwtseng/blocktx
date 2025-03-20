export const binarySearch = <T extends { [key: string]: number }>(
  array: T[], 
  target: number, 
  attribute: keyof T
): number => {
  let left = 0;
  let right = array.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid][attribute] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
