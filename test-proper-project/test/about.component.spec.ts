///<reference path="../node_modules/@types/jasmine/index.d.ts"/>
import {TestBed} from "@angular/core/testing";
import {AboutComponent} from "../src/scripts/modules/test/components/about/about.component";
import {HighlightDirective} from "../src/scripts/modules/test/directives/highlite.directive";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('highlite directive test', () => {

    let fixture;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [ AboutComponent, HighlightDirective],
            schemas:      [ NO_ERRORS_SCHEMA ]
        })
            .createComponent(AboutComponent);
        fixture.detectChanges(); // initial binding
    });

    it('should have skyblue <h2>', () => {
        const de = fixture.debugElement.query(By.css('h2'));
        const bgColor = de.nativeElement.style.backgroundColor;
        expect(bgColor).toBe('rgb(135, 206, 235)');
    });

});