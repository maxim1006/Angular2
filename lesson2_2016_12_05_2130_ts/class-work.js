"use strict";
/*let shaker: Shaker = {
    move() {},

    getStatus() {
        return {
            frequency: 1
        }
    }
};*/
/*Наследование от интерфейсов*/
// interface MoverShaker extends Mover, Shaker {
//     getStatus():{frequency: number, speed: number};
// }
//декларативное слияние интерфейсов, т.е. надо прописывать все свойства интерфейсво, если они созаданы в нескольких экземплярах
// interface IBase {
//     id: number;
// }
//
// let base1:IBase = {
//     id: 1,
//     name: "Max"
// };
//
// interface IBase {
//     name: string;
// }
//Дженерики (обобщение)
// function reverse<T> (list:T[]):T[] {
//     let reversedList:T[] = [],
//         length = list.length;
//
//     while (length--) {
//         reversedList.push(list[length]);
//     }
//
//     return reversedList;
// }
//
// console.log(reverse<number>([1, 2, 3]));  //[ 3, 2, 1 ]
// console.log(reverse([1, 2, 3]));  //[ 3, 2, 1 ]
// console.log(reverse<string>(["a", "b", "c"])); //[ 'c', 'b', 'a' ]
// console.log(reverse(["a", "b", "c"])); //[ 'c', 'b', 'a' ]
//
// interface Repository<T, TId> {
//     getById(id: TId): T;
// }
//
// let repository: Repository<string, number> = {
//     getById(number) {
//         return number + '';
//     }
// };
// console.log(repository.getById(1)); //1
//Alias
// type account = {
//     name:string,
//     age: number
// }
//
// let account: account;
// type account<T, I> = {
//     name:T,
//     age: I
// }
//
// let account: account<string, number>;
//
// account = {
//     name: "Max",
//     age: 1
// };
//Ограничение дженериков
// interface Account <T extends {id: number, name: string}> {
//    options:T;
// }
//
// let account1:Account<{id:number, name:string}>;
// // let account2:Account<{id:number, female:boolean}>; //ошибка
// let account3:Account<{id:number, name:string, female:boolean}>;
//
// account3 = {
//     options: {
//         id: 1,
//         name: "Max",
//         female: false
//     }
// };
//Функции
// function average(...array:number[]):number {
//     let average = 0,
//         i = 0,
//         l = array.length;
//
//     for (let i = 0; i < l; i ++) {
//         average += array[i];
//     }
//
//     return average/l;
// }
//
// console.log(average(1, 2, 3));
//Классы
1.45;