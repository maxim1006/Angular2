import {Directive, HostListener, ElementRef, Input, Output, EventEmitter, OnInit, HostBinding} from '@angular/core';

@Directive({
    selector: '[contentEditable]',
})

export class ContentEditableDirective implements OnInit {

    @Input() contentEditable: any;
    @Output() contentEditableChange = new EventEmitter();

    @HostBinding('class._content-editable')
    public contentEditableStyleClass = true;

    @HostListener('blur', ['$event'])
    public onBlur(e):void {
        this.contentEditableChange.emit(this.elRef.nativeElement.innerText);
    }

    constructor(private elRef: ElementRef) {
    }

    ngOnInit() {
        if (this.contentEditable) {
            this.elRef.nativeElement.innerText = this.contentEditable;
        }
    }

}