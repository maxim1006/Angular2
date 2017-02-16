//Реактивное программирование - высокоуровневая абстракция. Т.е. оно обеспечивает удобство разработки, многие вещи под капотом. Причем даже асинхронные. RXjs - библиотека с плюшками, работает и на сервере и на клиенте.



//Паттерн Singleton
/*
class Singleton {
    private static instance;

    private constructor() {
        console.log("Singleton created");
    }

    public static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

let singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();
let singleton3 = Singleton.getInstance();
*/



//Паттерн observer
/*interface IListener {
    update(message: string): void
}

interface IObserver {
    subscribe(listener: IListener): void;
    unsubscribe(listener: IListener): void;
    notify(message: string): void;
}

class Observer implements IObserver {
    private _listeners: IListener[] = [];

    public subscribe(listener: IListener): void {
        this._listeners.push(listener);
    }

    public unsubscribe(listener: IListener): void {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
    }

    public notify(message: string) {
        this._listeners.forEach((listener) => listener.update(message))
    }
}

let listener1: IListener = {
    update(message: string) {
        console.log(`from listener 1: ${message}`);
    }
};

let listener2: IListener = {
    update(message: string) {
        console.log(`from listener 2: ${message}`);
    }
};

let listener3: IListener = {
    update(message: string) {
        console.log(`from listener 3: ${message}`);
    }
};

let observer = new Observer();

observer.subscribe(listener1);
observer.subscribe(listener2);
observer.subscribe(listener3);

observer.unsubscribe(listener2);

observer.notify("hi");*/



//Паттерн итератор
/*interface IIterator {
    next():any;
    hasNext():boolean;
}

class Iterator implements IIterator {
    private _cursor:number = 0;
    private _array:any[];
    private _divider:number;

    public constructor(array:any[], divider:number = 1) {
        this._array = array;
        this._divider = divider;
    }

    public next():any {
        for (let i = this._cursor; i < this._array.length; i++) {
            let current = this._array[i];
            if (current % this._divider === 0) {
                this._cursor = i < this._array.length ? i + 1 : this._cursor;
                return current;
            }
        }
    }

    public hasNext() {
        for (let i = this._cursor; i < this._array.length; i++) {
            if (this._array[i+1] % this._divider === 0) {
                return true
            }
        }

        return false;
    }
}

let iterator: IIterator = new Iterator([1,2,3,4,5,6,7,8,9,10], 3);

console.log(iterator.next(), iterator.hasNext());
console.log(iterator.next(), iterator.hasNext());
console.log(iterator.next(), iterator.hasNext());
console.log(iterator.next(), iterator.hasNext());*/



//rx паттерн - наблюдаемая последовательность, т.е. комбинация этих 2х паттернов, распространяет значения по порядку, но не спрашивает, а пушит значения.

//Пока нет subscribe (хоть одного слушателя) ничего не происходит. После того как все слшушатели отработают, происходит нотификация об этом.

//пример кастомной последовательности

/*
import { Observable } from "../test-project/node_modules/rxjs/Observable";
import { Observer } from "../test-project/node_modules/rxjs/Observer";

//методы
import '../test-project/node_modules/rxjs/add/observable/from';
import '../test-project/node_modules/rxjs/add/observable/of';
import '../test-project/node_modules/rxjs/add/observable/fromEvent';
import '../test-project/node_modules/rxjs/add/observable/fromPromise';
import '../test-project/node_modules/rxjs/add/observable/range';

//операторы
import '../test-project/node_modules/rxjs/add/operator/map';
import '../test-project/node_modules/rxjs/add/operator/filter';
import '../test-project/node_modules/rxjs/add/operator/first';
*/



/* Последовательность строк
let sequence: Observable<string> = Observable.create((observer:Observer<string>) => {
    observer.next("Typescript");
    observer.next("=>");
    observer.next("cool");
    observer.complete();
});

sequence.subscribe(
    (item:string) => {
        console.log(item);
    },
    () => {},
    () => {
        console.log('finish');
    }
);
*/

/*
//Последовательность выражений с действиями
let sequence: Observable<number> = Observable.range(1, 4);

sequence
    .map((item: number) => {
        return item ** 2; //возвожу в степень
    })
    .filter((item: number) => {
        return item % 2 === 0; //возвожу в степень
    })
    .first()
    .subscribe((item:number) => {
        console.log(item);
    });
*/



//subject и его виды - это контролируемые последовательности

//AsyncSubject - контролируемый Observable, кеширует последнее состояние
/*
import { Observable } from "../test-project/node_modules/rxjs/Observable";
import { Observer } from "../test-project/node_modules/rxjs/Observer";
import { AsyncSubject } from "../test-project/node_modules/rxjs/AsyncSubject";
import '../test-project/node_modules/rxjs/add/observable/range';

function getValue():Observable<number> {
    let asyncSubject:AsyncSubject<number>;

    return Observable.create((observer:Observer<number>) => {
        if (!asyncSubject) {
            let delayRange = Observable.range(0, 7);
            asyncSubject = new AsyncSubject();
            delayRange.subscribe(asyncSubject);
        }

        return asyncSubject.subscribe(observer);
    });
}

//console.log(getValue()); //Observable { _isScalar: false, _subscribe: [Function] }
let cachedValue = getValue();

cachedValue.subscribe((item) => {
    console.log(item); //6, так как range от 0 до 7
});*/


//BehaviorSubject - сохраняет init состояние и передает его в другую последовательность.  (горячий обзервбл)
// import { Observable } from "../test-project/node_modules/rxjs/Observable";
// import { BehaviorSubject } from "../test-project/node_modules/rxjs/BehaviorSubject";
// import '../test-project/node_modules/rxjs/add/observable/range';
//
// let behaviorSubject:BehaviorSubject<string|number> = new BehaviorSubject('init value');
//
// behaviorSubject.subscribe((item) => {
//     console.log(item);
// });
//
// Observable.range(0,5).subscribe(behaviorSubject);  //init value, 0, 1, 2, 3, 4, 5



//Бывают горячие и холодные observable

//холодные observable - каждый раз когда подписываюсь на observable, получаю все данные, которые в нем есть, т.е. в какой бы момент не подписывался, получаю весь сет данных
/*import { Observable } from "../test-project/node_modules/rxjs/Observable";
import { BehaviorSubject } from "../test-project/node_modules/rxjs/BehaviorSubject";
import '../test-project/node_modules/rxjs/add/observable/range';

let sequence = Observable.range(0, 5);
sequence.subscribe((item) => console.log(item));
sequence.subscribe((item) => console.log(item));
sequence.subscribe((item) => console.log(item));*/


//горячие observable это например клик, те когда происходит клик, я не знаю какие клики были до этого. Работаю только с последним значением.
/*
import { Subject } from "../test-project/node_modules/rxjs/Subject";

let subject:Subject<number> = new Subject();

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
subject.subscribe((item) => console.log(item)); //5, т.е. только последнее значение.
subject.next(5);
*/


//Из горячего можно сделать холодный observable
import { ReplaySubject } from "../test-project/node_modules/rxjs/ReplaySubject";

let replaySubject:ReplaySubject<any> = new ReplaySubject(10);//10 - 10 предыдущих значения в цепочке до subscribe

setTimeout(()=>replaySubject.next(1), 100);
setTimeout(()=>replaySubject.next(2), 200);
setTimeout(()=>replaySubject.next(3), 300);
setTimeout(()=>replaySubject.next(4), 400);
setTimeout(()=>replaySubject.next(5), 500);
setTimeout(()=>replaySubject.next(6), 600);
setTimeout(()=>replaySubject.next(7), 700);
setTimeout(()=>replaySubject.subscribe((item) => console.log(item)), 600);


