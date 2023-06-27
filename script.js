function findCombinations(arr, target) {
  const firstCombination = [];
  const secondCombination = [];

  // For finding pair sum equal to target value
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        const pair = [arr[i], arr[j]];
        firstCombination.push(pair);
      }
    }
  }

  // Merging the array with the first combination
  const mergedArray =firstCombination.flat();//flat function basically convert the 2d array into 1d
  
  // Now sorting the array
  mergedArray.sort((a, b) => a - b);//it will sort the array in ascending order

  const doubleTarget = target * 2;

  // Find combinations that sum up to the double target value
  const findCombinationsRecursively = (startIndex, currentCombination, remainingSum) => {
    if (remainingSum === 0) {
      secondCombination.push(currentCombination);
      return;
    }

    for (let i = startIndex; i < mergedArray.length; i++) {
      const currentNum = mergedArray[i];
      if (currentNum > remainingSum) {
        break;//cause value will bne greater than target value.
      }
      if (i > startIndex && mergedArray[i] === mergedArray[i - 1]) {
        continue; // basically to skip the dublicate elements
      }
      findCombinationsRecursively(i + 1, [...currentCombination, currentNum], remainingSum - currentNum);
    }
  };

  findCombinationsRecursively(0, [], doubleTarget);

  return [firstCombination, mergedArray, secondCombination];
}

// Example usage as per the question
const arr = [1, 3, 2, 2, -4, -6, -2, 8];
const target = 4;
const [firstCombination, mergedArray, secondCombination] = findCombinations(arr, target);

console.log("First combination for", target, ":", firstCombination);
console.log("Merged into a single array:", mergedArray);
console.log("Second combination for", target * 2, ":", secondCombination);
