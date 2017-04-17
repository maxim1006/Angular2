///<reference path="../node_modules/@types/jasmine/index.d.ts"/>
import {ComponentFixture, TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {BannerComponent} from "../src/scripts/modules/test/components/banner-inline/banner-inline.component";

describe('BannerComponent (inline template)', () => {

    let comp:    BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BannerComponent ],   // declare the test component
            providers: [
                //{ provide: ComponentFixtureAutoDetect, useValue: true } //автоматический апдейт (в ручную это fixture.detectChanges(), если сам делаю какое-то изменение в тесте то должен делать и fixture.detectChanges(), несмотря на эту беспонтовую автоматику, реагирующую на asynchronous activities such as promise resolution, timers, and DOM events.)
            ]
        });
        
        fixture = TestBed.createComponent(BannerComponent); // создает инстанс компонента

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });

    it('should display original title', () => {
        fixture.detectChanges(); //пока не вызову это, ничего не применится, т.е. этот метод обновляет текущий стейт теста.
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
});

