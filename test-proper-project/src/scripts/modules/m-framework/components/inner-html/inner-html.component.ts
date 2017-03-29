import {Component, ViewChild, ViewChildren, ElementRef, OnInit, Input} from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    selector: "inner-html",
    templateUrl: "./inner-html.component.html"
})

export class InnerHtmlComponent implements OnInit {
    private htmlContent: SafeHtml;

    @Input()
    htmlContentOuter;

    public constructor( private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(`
            <span class="content">Inner html content from Controller123</span>
            <el-native-element></el-native-element>
        `);
    }
}