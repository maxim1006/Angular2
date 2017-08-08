import {Component, OnInit} from '@angular/core';
import {PageLoaderService} from "./common/services/page-loader.service";

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(public pageLoaderService: PageLoaderService) {}

    ngOnInit() {
    }

    activateEvent(event) {
        this.pageLoaderService.activateRoute(event);
        console.log(event, ' activated component');
    }

    deactivateEvent(event) {
        this.pageLoaderService.deactivateRoute();
        console.log(event, ' deactivated component');
    }


}


