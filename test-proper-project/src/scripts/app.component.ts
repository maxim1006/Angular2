import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {
    }

    activateEvent(event) {
        console.log(event, ' activated component');
    }

    deactivateEvent(event) {
        console.log(event, ' deactivated component');
    }
}
