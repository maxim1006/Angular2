///<reference path="../node_modules/@types/jasmine/index.d.ts"/>

import {Injectable} from "@angular/core";
@Injectable()
export class FancyService {
    getTimeoutValue() {
        let promise = new Promise((res, rej) => {
             setTimeout(() => {
                 res('timeout value');
             });
        });

        return promise;
    }
}

import {TestBed, async, inject} from "@angular/core/testing";
describe('FancyService test', () => {
    let service: FancyService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [FancyService] });
    });

    it('test should wait for FancyService.getTimeoutValue',
        async(inject([FancyService], (service: FancyService) => {
        service.getTimeoutValue().then(
            value => expect(value).toBe('timeout value')
        );
    })));

});