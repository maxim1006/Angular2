import {Injectable} from '@angular/core';

@Injectable()
export class HomeService {

    public name: string = "HomeService";

    constructor() {
        console.log(`Service ${this.name} is inited`);
    }
}