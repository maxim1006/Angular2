import { Component } from "@angular/core";

@Component({
    selector: "ngfor-example",
    templateUrl: "./ngforExampleComponent.html"
})
export class NgforExampleComponent {

    family = [
        {
            name: "Max",
            age: 29,
            sex: "male"
        },
        {
            name: "Aliya",
            age: 30,
            sex: "female"
        },
        {
            name: "Anton",
            age: 30,
            sex: "male"
        }
    ];

}