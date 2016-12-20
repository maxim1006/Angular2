"use strict";

//definitions
// import * as $ from 'jquery'; //вот так импорчу
//
// $();

//для своих библиотек, или для библиотек, для которых нет определения делаю кастомный index.d.ts в папке types,
//также не забыть прописать "typeRoots": ["node_modules", "types"] в tsconfig.json,
// если нужны конкретные типы types: []
//если не знаю где брпть и лень описывать
// declare const _:any;
// _.a;

//"lib": ["es5", "dom", "es2015.promise"] - библиотеки, которые надо подключить, входят в состав ts

//использование (описание вынесено в types/fetch)
// fetch('cat.jpg')
//     .then((res:Response)=>res.blob())
//     .then((blob)=>{
//          let objectURL = URL.createObjectURL(blob),
//          img = new Image(),
//          container:HTMLElement = document.querySelector("#container") as HTMLElement;
//
//          img.src = objectURL;
//
//          container.insertAdjacentElement("afterbegin", img);
//     });



/*Decorators*/   //для их использования в настройках tsconfig должен сделать "experimentalDecorators": true,

//Описание декораторов
// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Function, propertyKey: string | symbol, parameterIndex: number) => void;


//пример декорирования метода
// class MathLib {
//
//     @logMethod
//     public getCircleSquare(r:number) {
//         return Math.PI * r ** 2; //** - это возведение в степень es7
//     }
//
// }
//
// function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor):PropertyDescriptor {
//     let originalDesc = descriptor.value;
//
//     //console.log(descriptor); //объект в свойстве value которого лежит функция
//
//     descriptor.value = (...args:number[]):number => {
//         //console.log(args); //3 аргументы декорируемой функции
//         //console.log(propertyKey); //getCircleSquare имя функции
//
//         let b = args.join();
//         let result = originalDesc(...args);
//
//         //console.log(result); //28.274333 - число, результат выполнения функции.
//
//         console.log(`Call ${propertyKey}(${b}) => ${result}`);
//
//         return result; //могу что-то сделать с результатом выполнения ф-ции, например return result*2
//     };
//
//     return descriptor;
// }
//
// let a = new MathLib();
//
// a.getCircleSquare(3);



//пример декорирования свойства
// class Account {
//     @logProperty
//     public firstName:string;
//     public lastName:string;
//
//     public constructor(firstName:string, lastName:string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//
//     getFirstName() {
//         return this.firstName;
//     }
// }
//
// function logProperty(target: any, propertyKey: string):void {
//     let _val = target[propertyKey];
//
//     // console.log(target); //Account {} //прототип объекта Account
//     // console.log(propertyKey); //firstName - декорируемое свойство
//
//     let getter = (): typeof _val => {
//         console.log(`Get ${propertyKey} => ${_val}`);
//         return _val;
//     };
//
//     let setter = (newValue):void => {
//         console.log(`Set ${propertyKey} => ${_val} to ${newValue}`);
//
//         _val = newValue;
//
//         return newValue;
//     };
//
//     Object.defineProperty(target, propertyKey, {
//         get: getter,
//         set: setter,
//         enumerable: true
//     });
// }
//
// let me = new Account("Max", "Maximov");
// console.log(me.getFirstName());



//декорирование класса
// @logClass
// class Account {
//
//     public firstName:string;
//     public lastName:string;
//
//     public constructor(firstName?:string, lastName?:string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logClass(target:any): any {
//     // console.log(target); //функция конструктор Account
//     return () => {
//         console.log(`New instance of ${target.name}`); //New instance of Account
//
//         return target;
//     }
// }
//
// let person1 = new Account("Aliya");



//декоратор параметра
class Account {

    public firstName:string;
    public lastName:string;

    public constructor(firstName?:string, lastName?:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @readMetaData
    public sayMessage(@writeMetaData msg:string):string {
        return `${this.firstName} ${this.lastName}: ${msg}`
    }
}

function writeMetaData(target: any, propertyKey: string, parameterIndex: number):void {
    console.log(propertyKey, ' propertyKey'); //sayMessage
    console.log(target, ' target'); //Account { sayMessage: [Function] } - прототип
    console.log(parameterIndex, ' parameterIndex');  // 0
    console.log(`___log_${propertyKey}__parameters`); //sayMessage
}

function readMetaData(target: any, propertyKey: string, descriptor: PropertyDescriptor):PropertyDescriptor {
    let originalDesc = descriptor.value;

    descriptor.value = (...args:number[]):number => {
        return originalDesc(...args); //могу что-то сделать с результатом выполнения ф-ции, например return result*2
    };

    return descriptor;
}