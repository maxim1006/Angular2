import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subject, of, from, range } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'rxjs-example1',
    template: `
        <h2>Rxjs Example 1</h2>
        <input #input type='text' style='border: 1px solid;'/>

        <button (click)='_unsubscribeInputEvent()'>Unsubscribe input event</button>

    `
})

export class RxjsExample1Component implements AfterViewInit, OnDestroy {
    @ViewChild('input')
    private inputRef: ElementRef;

    private destroy$: Subject<any> = new Subject();

    public ngAfterViewInit(): void {
        const input = this.inputRef.nativeElement;
        
        fromEvent(input, 'input')
        .pipe(
            debounceTime(500), 
            takeUntil(this.destroy$)
        )
        .subscribe((event) => {
            console.log(event['target'].value);    
        });

        of([1, 2, 3])
        .subscribe((event) => {
            console.log(event); // [1, 2, 3]   
        });

        from([1, 2, 3])
        .subscribe((event) => {
            console.log(event); // 1, 2, 3   
        });

        from('str')
        .subscribe((event) => {
            console.log(event); // s, t, r   
        });

        range(1, 10)
        .subscribe((event) => {
            console.log(event); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10   
        });
    }
    
    public ngOnDestroy(): void {
        this.destroySubscribers();
    }

    /** @internal */
    public _unsubscribeInputEvent(): void {
        this.destroySubscribers();
    }

    private destroySubscribers(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
