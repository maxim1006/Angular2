import {Component, ViewChild, ViewChildren, ElementRef, OnInit, Input} from '@angular/core';

@Component({
    selector: "inner-html",
    templateUrl: "./inner-html.component.html"
})

export class InnerHtmlComponent implements OnInit {
    private htmlContent: string;

    @Input()
    htmlContentOuter;

    public constructor() {
    }

    ngOnInit() {
        this.htmlContent = `
            <span class="content">Inner html content from Controller</span>
        `;
    }
}