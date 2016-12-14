// "use strict";
//
// function isInArray(arr:number[], ...rest):boolean {
//
//     return rest.every((el) => {
//         return arr.indexOf(el) !== -1
//     });
//
// }
//
// console.log(isInArray([1,2, 3], 1,3, 2));
//
//
//
//
// function makeSum(...numbers:(string | number)[]):number {
//    let sum = 0;
//
//    numbers.forEach((el) => {
//        sum += (+el);
//    });
//
//    return sum;
// }
//
// console.log(makeSum("1", 2, "3", 4));
//
//
//
// type getUniqueArgs = number | boolean | string;
//
// function getUnique(arr:getUniqueArgs[] = []):getUniqueArgs[] {
//     let newArr:getUniqueArgs[] = [];
//
//     arr.forEach((el) => {
//        if (!~newArr.indexOf(el)) {
//            newArr.push(el);
//        }
//     });
//
//     return newArr;
// }
//
// console.log(getUnique([1, "2", true, true, 2]));
//
//
//
// function reverseCharacters(string: string):string {
//     let length = string.length,
//         i = 0,
//         regexp = /[a-zа-яё]/i,
//         newStr = '',
//         positions = {},
//         arr;
//
//     for (; i < length; i++) {
//         if (regexp.test(string[i])) {
//             newStr = string[i] + newStr;
//         } else {
//             positions[i] = {
//                 symbol: string[i]
//             }
//         }
//     }
//
//     arr = newStr.split('');
//
//     Object.keys(positions).forEach((el) => {
//         arr.splice(+el, 0, positions[el].symbol);
//     });
//
//     return arr.join('');
// }
//
// console.log(reverseCharacters("abc%de#f123"));
//
//
