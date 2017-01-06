import {Component} from '@angular/core';

@Component({
    selector: "data-binding",
    templateUrl: "./data-binding.component.html"
})

export class DataBindingComponent {
    public constructor() {
    }

    //one-way binding
    public image = "http://grinz.ru/jquery/imagePreloading/images/14.jpg";
    public image1 = "http://grinz.ru/jquery/imagePreloading/images/11.jpg";

    public onImage1Click():void {
        console.log(`image1 clicked!`);
    }

    public inputValue:string;

    public prop = {
        name: 'Property from parent component'
    };

    public onModelChange():void {
        console.log(this.inputValue);
    }

    public onTwoWayClick(event):void {
        console.log(event);
        this.inputValue = event[0];
    }

    public onSelectItem(event):void {
        console.log('get item in parent directive: ', event);
    }
}