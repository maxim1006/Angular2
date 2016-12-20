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

//Пересечение
// type customType = string | number | boolean;
// let val: customType = "a";
// let val1: customType = 1;
// let val2: customType = true;



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

// let array: ReadonlyArray<number> = [0,1,2,3];
// array[4] = 2; //ошибка, так как только ридонли


// let func: (r:number) => number;
// let func1: {(r:number): number};
//
// let myClass: new (r:number) => number;
// let myClass1: {new (r:number): number};



//Interface - его главная задача быть контрактом для класса.
// interface Account {
//     name: string,
//     age: number
// }
//
// let account: Account;


/*
interface Mover {
    move(): void;
    //getStatus:()=>{speed: number} - либо так
    getStatus():{speed: number}
}
*/

/*let mover: Mover = {
    move() {},
    getStatus() {
        return {
            speed: 10
        }
    }
};*/

/*
interface Shaker {
    move(): void;
    getStatus():{frequency: number};
}
*/

/*let shaker: Shaker = {
    move() {},

    getStatus() {
        return {
            frequency: 1
        }
    }
};*/

/*Наследование от интерфейсов*/
/*interface MoverShaker extends Mover, Shaker {
    getStatus():{frequency: number, speed: number};
}*/

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


// function f(this:void) { //так отключаю контекст
//    this.a = 1; //ошибка
// }



//Классы
/*class Point {
    public x: number; //доступен извне
    private y: number;  //доступен только внутри Point
    protected z: number; //доступен в наследнике

    constructor() {
        this.x = 1;
        this.y = 1;
        this.z = 1;
    }

    getX():number {
        return this.x;
    }

    getY():number {
        return this.y;
    }
}

let point = new Point();
//
// point.y; //error
// point.z; //error


class MyPoint extends Point {
    constructor() {
        super();
        console.log(this);
    }
}

let myPoint = new MyPoint();*/

//появились приватные конструкторы
/*class Singleton {
    private static instance;

    private constructor() {
        console.log("Singleton created");
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

// let singleton = new Singleton(); //error
let singleton = Singleton.getInstance();
console.log(singleton);
let singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
let singleton3 = Singleton.getInstance();*/


//имплементирование интерфейсов
// interface Point {
//     x: number;
//     y: number;
// }
//
// interface Calc {
//     countCoord():number;
// }
//
// class BasicPoint implements Point,Calc {
//     public x:number;
//     public y:number;
//
//     public countCoord():number {
//         return 1;
//     }
// }

