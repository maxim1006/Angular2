import {
    Directive, HostListener, EventEmitter, Input, NgZone, ElementRef, OnInit, AfterViewInit,
    Output
} from '@angular/core';


@Directive({
    selector: '[slideToggle]'
})
export class SlideToggleDirective implements AfterViewInit {
    public el: HTMLElement;

    private _toggled: boolean = true;
    private _isAnimating: boolean = false;
    private _requestAnimationFrameId: number;
    private _direction: string = 'up';
    private _height: number;
    private _elStyleHeight: number;

    constructor(private _elRef: ElementRef,
                private _zone: NgZone) {
    }

    @Input()
    public duration: number = 200;

    ngAfterViewInit(): void {
        let self = this;

        self.el = self._elRef.nativeElement;
        self._height = self.el.offsetHeight;
    }

    @Input()
    public set slideToggle(value: boolean) {
        let self = this;

        self._toggled = value;

        console.log(self._toggled);
        console.log(self._isAnimating);

        if (!self._isAnimating && self.el) {
            self._isAnimating = true;

            self._direction = value ? 'up' : 'down';

            self._zone.runOutsideAngular(() => {

                self.el.style.overflow = 'hidden';
                self.animate();
            });

        }
    };

    public get slideToggle(): boolean {
        return this._toggled;
    };

    @Output()
    public slideToggleChange = new EventEmitter<boolean>();

    private animate() {
        let self = this,
            start = performance.now();

        self._requestAnimationFrameId = requestAnimationFrame(function animate(time) {

            let timePassed = time - start;

            if (timePassed > self.duration) {
                timePassed = self.duration;
                self._onAnimationEnd();
            }

            self._tick(timePassed);

            if (timePassed < self.duration &&
                self._direction === "up" && self._elStyleHeight > 0 ||
                self._direction === "down" && self._elStyleHeight < self._height
            ) {
                console.log(self._elStyleHeight, " self._elStyleHeight");
                self._requestAnimationFrameId = window.requestAnimationFrame(animate);
            }
        });
    }

    private _onAnimationEnd() {
        let self = this;

        console.log(self._direction === "up", " self._direction === \"up\"");
        window.cancelAnimationFrame(self._requestAnimationFrameId);

        if (self._direction === "up") {
            self._direction = "down";
            self._toggled = false;
        } else {
            self._direction = "up";
            self._toggled = true;
        }

        self._isAnimating = false;

    }

    private _tick(timePassed: number) {
        let self = this,
            timePassedPercentage: number = Math.ceil(Math.abs(timePassed) / self.duration * 100),
            currentTimePassedPercentage = self._direction === "up" ? 100 - timePassedPercentage : timePassedPercentage;

        console.log(self._direction);

        self._elStyleHeight = self._height * currentTimePassedPercentage / 100;
        self.el.style.height = self._elStyleHeight + 'px';

        if (timePassedPercentage === 100) {
            self._onAnimationEnd();
        }
    }

}