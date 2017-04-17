///<reference path="../node_modules/@types/jasmine/index.d.ts"/>
import {ComponentFixture, TestBed, ComponentFixtureAutoDetect, async} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {BannerInlineOuterTemplateComponent} from "../src/scripts/modules/test/components/banner-inline-outer-template/banner-inline-outer-template.component";

describe('BannerComponent (templateUrl)', () => {

    let comp:    BannerInlineOuterTemplateComponent;
    let fixture: ComponentFixture<BannerInlineOuterTemplateComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BannerInlineOuterTemplateComponent ], // declare the test component
        })
            .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(BannerInlineOuterTemplateComponent);

        comp = fixture.componentInstance; // BannerInlineOuterTemplateComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('no title in the DOM until manually call `detectChanges`', () => {
        console.log(el.textContent, ' ---');
        expect(el.textContent).toEqual('');
    });

    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different test title', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });

});



