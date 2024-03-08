export default function chunkBy<T>(arr: Array<T>, size: number): T[][] {
  const newArr: T[][] = Array(Math.ceil(arr.length / size)).fill([]);
  newArr.forEach((_,i) => {
    newArr[i] = arr.slice(i * size, (i * size) + size);
  })
  return newArr;
}
