import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output} from '@angular/core';


@Directive({
    selector: '[slideToggle]'
})
export class SlideToggleDirective implements AfterViewInit {
    public element: HTMLElement;

    private _toggled: boolean = true;
    private _toggleStateOnAnimationStart: boolean = true;
    private _isAnimating: boolean = false;
    private _requestAnimationFrameId: number;
    private _direction: string = 'up';
    private _height: number;
    private _elementStyleHeight: number;
    private _initOverflowStyle: string | any;

    constructor(private _elementRef: ElementRef,
                private _zone: NgZone) {
    }

    @Input()
    public duration: number = 2000;

    ngAfterViewInit(): void {
        let self = this;

        self.element = self._elementRef.nativeElement;
        self._initOverflowStyle = getComputedStyle(self.element).overflow;
    }

    @Input()
    public set slideToggle(value: boolean) {
        let self = this;

        self._toggled = value;

        if (!self._isAnimating && self.element) {
            self._runAnimation();
        }
    };

    public get slideToggle(): boolean {
        return this._toggled;
    };

    private _runAnimation() {
        let self = this;

        self._toggleStateOnAnimationStart = self._toggled;
        self._setElHeight();
        self._isAnimating = true;
        self._direction = self._toggled ? 'down' : 'up';

        self._zone.runOutsideAngular(() => {
            self.element.style.overflow = 'hidden';
            self._animate();
        });
    }

    private _animate():void {
        let self = this,
            start = performance.now();

        self._requestAnimationFrameId = requestAnimationFrame(function animate(time) {

            let timePassed = time - start;

            if (timePassed > self.duration) {
                timePassed = self.duration;
            }

            self._tick(timePassed);

            if (timePassed < self.duration &&
                self._direction === "up" && self._elementStyleHeight > 0 ||
                self._direction === "down" && self._elementStyleHeight < self._height
            ) {
                self._requestAnimationFrameId = requestAnimationFrame(animate);
            }
        });
    }

    private _onAnimationEnd():void {
        let self = this;
        window.cancelAnimationFrame(self._requestAnimationFrameId);

        if (self._toggled) {
            self.element.style.overflow = self._initOverflowStyle;
        }

        if (self._toggleStateOnAnimationStart !== self._toggled) {
            self._toggleStateOnAnimationStart = self._toggled;
            self._runAnimation();
        } else {
            self._isAnimating = false;
        }

        console.log(123);
    }

    private _tick(timePassed: number):void {
        let self = this,
            timePassedPercentage: number = Math.ceil(Math.abs(timePassed) / self.duration * 100),
            currentTimePassedPercentage = self._direction === "up" ? 100 - timePassedPercentage : timePassedPercentage;

        self._elementStyleHeight = self._height * currentTimePassedPercentage / 100;
        self.element.style.height = self._elementStyleHeight + 'px';

        if (timePassedPercentage === 100) {
            self._onAnimationEnd();
        }
    }

    private _setElHeight() {
        let self = this,
            elementInitComputedStyle = getComputedStyle(self.element),
            initVisibilityParametersMap = {},
            visibilityParametersMap = {
                opacity: 0,
                visibility: "hidden",
                height: "auto"
            };

        for (let key in visibilityParametersMap) {
            initVisibilityParametersMap[key] = elementInitComputedStyle[key];
            self.element.style[key] = visibilityParametersMap[key];
        }

        self._height = self.element.offsetHeight;

        for (let key in initVisibilityParametersMap) {
            self.element.style[key] = initVisibilityParametersMap[key];
        }
    }

}