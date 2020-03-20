// 4. Implement Selection Sort
    //Loop till the second last element
    //Loop after the i till the last element
    //If jth element is less than the ith element then swap
    //Change < to > for sorting in descending order
function selectionSort(arr) {
    for(let i=0; i<arr.length; i++){//going through array
        // console.log(i);
        let smallerIndex = i; //storing index to compare value
        for(let j=i+1; j< arr.length; j++){ // going thru array with index
            // console.log(`i is ${i}, j is ${j}`);
            if(arr[smallerIndex]>arr[j]){//comparing values of array to see what is smaller
                smallerIndex = j;//replacing index num if j's val is smaller
                // console.log(`switching ${arr[i]} > ${arr[j]} index: ${smallerIndex}`)
            }
        }
        if(smallerIndex !== i){//if there was a index num change
            switching(arr, i, smallerIndex);//switch positions
            // console.log(`new array is ${arr}`)
        }
    }
    return arr;
}

function switching(array, index1, index2){
    let temp = array[index1]; // storing index1 value
    array[index1] = array[index2]; //replacing index1 val with index2 val
    array[index2] = temp; //putting index1 val into index2 position in array
}  

console.log(selectionSort([1, 8, 2, 4, 5]));