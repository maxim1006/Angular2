"use strict";

// interface Account {
//     name?: string;
//     age?: number;
// };
//
// let accout:Account = {};

// let person = {
//     name: "max"
// };
//
// let anotherPerson: typeof person;
//
// anotherPerson = {name: "Aliya"};



//Класс существует в обоих областях и области определения переменных js и области определения типов ts
// class Account {
//     name: string;
//     age: number;
// }
//
// let person1 = Account;
// let person2: Account;



//Ошибка, так как тип автоматически подхватился (утиная типизация)
// let myVar = 2;
// myVar = true;



//примитивные типы
// let num:number = 1;
// let str:string = 'str';
// let bool:boolean = true;



//Специальные типы void и any
// let undef: void = undefined;
// let nullValue: void = null;
// let func:()=>void; //функция ничего не возвращает
// let a:any; //any - что угодно



//Объектные типы
// const account: {
//         readonly name:string,   //если поставил readonly, то не могу менять
//         readonly age: number,  //если поставил readonly, то не могу менять
//         occupation?:string
//         getName?():string,
//         getAge?: () => number
//     } = {
//     name: "max",
//     age: 29
// };

// account.name = 'Aliya';   //будет ошибка, так как свойство readonly


// let array: string[];
// let array1: Array<string>;
// let array2: {
//     readonly name:string,   //если поставил readonly, то не могу менять
//     readonly age: number,  //если поставил readonly, то не могу менять
//     occupation?:string
//     getName?():string,
//     getAge?: () => number
// }[];
//
// let array3:[string, number];
//
// array3 = ["a", 1, 1, "vc", "vc", "vc", "vc", "vc", 1, 1, 1, 1, 1];


// let func: (r:number) => number;
// let func1: {(r:number): number};
//
// let myClass: new (r:number) => number;
// let myClass1: {new (r:number): number};



//Interface





