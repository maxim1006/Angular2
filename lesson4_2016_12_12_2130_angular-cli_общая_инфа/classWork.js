// 1) устанавливаю npm install -g angular-cli
//@NgModule - служит для описания, всего приложения, все, что описываю в declarations будет доступно во всех компонентах.
//imports - импорт модулей
//bootstrap - указываем рутовый компонент, который бутстрапит приложение.
// @NgModule({
//     declarations: [
//         AppComponent
//     ],
//     imports: [
//         BrowserModule,
//     ],
//     providers: [],
//     bootstrap: [AppComponent]
// })
//При интерполяции нет доступа к глобальному объекту, запрещены new, -=, +=, =, ;
//Оператор безопасности <p>{{person1?.name}}</p> - если нет объекта, то ставлю в конце условный оператор.
/* //Так можно передать элемент через ссылку
<input type="text" #myInput> {{myInput.value}}
<button (click)="onButtonClick(myInput)">Get input</button>
*/
/*
    Биндинг:
    (user_event)="handler(arguments)"
*/
/*
    Существуют декораторы
    @ViewChild - ищу внутри компонента,
    @ViewChildren,
    @ContentChild - внутри вложенных компонентов,
    @ContentChildren
*/
/*
    ngModel лежит в import {FormsModule} from '@angular/forms';
*/ 
