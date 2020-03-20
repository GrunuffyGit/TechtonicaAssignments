// Given a non-empty array of integers, every element appears twice except for one. Find that single one.

// Note:

// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:

// Input: [2,2,1]
// Output: 1
// Example 2:

// Input: [4,1,2,1,2]
// Output: 4

var singleNumber = function(nums) {
    let map = new Map(); //create a map
    for(let i=0; i<nums.length; i++){ //run through nums array
        if(typeof map.get(nums[i]) === "undefined"){ //checking if map already contains the num
            map.set(nums[i], nums[i]);//setting (key, value) if doesn't exist
        }else{//if map already has (key, value)
            map.delete(nums[i]);//delete (key, value) from map
        }
    }
    return map.values();//returning the values that aren't duplicates
};

console.log(singleNumber([4,1,2,1,2]));