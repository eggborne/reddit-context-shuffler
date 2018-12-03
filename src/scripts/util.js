export function shuffleArray(arr) {
  let ctr = arr.length;
  let temp;
  let index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}