import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from "@angular/core";

@Component({
    selector: "m-scroll",
    templateUrl: "./m-scroll.component.html"
})

export class MScrollComponent implements OnInit {

    @Input() styleClass: String;
    @Input() customStyle: Object;
    @Input() scrollBlockStyle: Object;
    @Input() minSliderSize: number;
    @Input() minSliderWidthSize: number;

    @ViewChild('mScrollInner') mScrollInner: ElementRef;
    @ViewChild('mScroll') mScroll: ElementRef;
    @ViewChild('mScrollSlider') mScrollSlider: ElementRef;
    @ViewChild('mScrollSliderWrap') mScrollSliderWrap: ElementRef;
    @ViewChild('mScrollSliderHorizontal') mScrollSliderHorizontal: ElementRef;
    @ViewChild('mScrollSliderWrapHorizontal') mScrollSliderWrapHorizontal: ElementRef;

    obj: HTMLElement;
    scroll: HTMLElement;
    ySlider: HTMLElement;
    ySliderWrap: HTMLElement;
    ySliderHorizontal: HTMLElement;
    ySliderHorizontalWrap: HTMLElement;

    doc: Document = document;
    win: Window = window;
    objHeight: number = 0;
    yBarHeight: number = 0;
    yBarWidth: number = 0;
    scrollHeight: number = 0;
    scrollWidth: number = 0;
    ySliderHeight: number = 0;
    ySliderHorizontalWidth: number = 0;
    ySliderHeightFull: number = 0;
    ySliderHorizontalWidthFull: number = 0;
    yEdgeBtm: number = 0;
    yEdgeRight: number = 0;
    delta: number = 0;
    deltaHorizontal: number = 0;
    startPoint: number = 0;
    startPointX: number = 0;
    canDrag: boolean = true;
    canDragX: boolean = true;
    startPosition: number = 0;
    startPositionX: number = 0;
    direction: string;
    SCROLL_RATIO: number = 0;
    SCROLL_RATIO_X: number = 0;
    scrollScrollTop: number = 0;
    scrollScrollLeft: number = 0;
    scrollbarWidth: number = 0;
    ySliderWrapVisible: boolean;
    ySliderHorizontalWrapVisible: boolean;
    windowResizeTimeoutID: number;
    autoResizeFlag: boolean;
    timeoutID: number;
    mobile: boolean;
    scrollStartBind:     ()=>void;
    mouseWheelBind:      ()=>void;
    scrollStartXBind:    ()=>void;
    mouseMoveBind:       ()=>void;
    mouseUpBind:         ()=>void;
    windowResizeBind:    ()=>void;
    mouseScrollBind:     ()=>void;
    clickBind:           ()=>void;
    clickHorizontalBind: ()=>void;
    autoResizeBind:      ()=>void;
    autoResizeEndBind:   ()=>void;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.mobile = this.isMobile();
    }

    ngAfterViewInit() {

        this.obj = this.mScroll.nativeElement;
        this.scroll = this.mScrollInner.nativeElement;
        this.ySlider = this.mScrollSlider.nativeElement;
        this.ySliderWrap = this.mScrollSliderWrap.nativeElement;
        this.ySliderHorizontal = this.mScrollSliderHorizontal.nativeElement;
        this.ySliderHorizontalWrap = this.mScrollSliderWrapHorizontal.nativeElement;

        this.objHeight = this.obj.offsetHeight;

        this.scrollbarWidth = this.getScrollbarWidth();

        this.hideNativeScrolls();
        this.updateVars();
        this.bindEvents();
        
    }

    getScrollbarWidth() {
        let scrollDiv, scrollbarWidth;

        scrollDiv = document.createElement("div");
        scrollDiv.className = "m-scroll-measure";
        document.body.appendChild(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    }

    hideNativeScrolls() {
        this.scroll.style.height = `calc(100% + ${this.scrollbarWidth}px)`;
        this.scroll.style.width = `calc(100% + ${this.scrollbarWidth}px)`;
    }

    updateVars() {
        this.objHeight = this.yBarHeight = this.obj.offsetHeight;
        this.scrollHeight = this.scroll.scrollHeight;
        this.ySliderHeightFull = this.minSliderSize ? this.minSliderSize : this.yBarHeight*this.yBarHeight/this.scrollHeight;
        this.ySlider.style.height = this.ySliderHeightFull + 'px';
        this.ySliderHeight = this.ySliderHeightFull/2;
        this.yEdgeBtm = this.yBarHeight - this.ySliderHeightFull;

        this.countDelta();

        this.startPoint = 0;
        this.startPosition = 0;
        this.canDrag = false;
        this.canDragX = false;
        this.SCROLL_RATIO = (this.yBarHeight - this.ySliderHeightFull)/(Math.ceil(this.scrollHeight/this.yBarHeight*2));
        this.scrollScrollTop = this.scroll.scrollTop;

        if (this.scrollScrollTop) {
            this.ySlider.style.top = this.scrollScrollTop/this.delta + 'px';
        } else {
            this.ySlider.style.top = 0 + 'px';
        }

        this.scrollWidth = this.scroll.scrollWidth;
        this.yBarWidth = this.obj.offsetWidth;
        this.ySliderHorizontalWidthFull = this.minSliderWidthSize ? this.minSliderWidthSize : this.yBarWidth*this.yBarWidth/this.scrollWidth;
        this.ySliderHorizontal.style.width = this.ySliderHorizontalWidthFull + 'px';
        this.ySliderHorizontalWidth = this.ySliderHorizontalWidthFull/2;
        this.yEdgeRight = this.yBarWidth - this.ySliderHorizontalWidthFull;

        this.countDeltaHorizontal();

        this.startPointX = 0;
        this.startPositionX = 0;
        this.scrollScrollLeft = this.scroll.scrollLeft;
        this.SCROLL_RATIO_X = (this.yBarWidth - this.ySliderHorizontalWidthFull)/(Math.ceil(this.scrollHeight/this.yBarHeight*2));

        if (this.scrollScrollLeft) {
            this.ySliderHorizontal.style.left = this.scrollScrollLeft/this.deltaHorizontal + 'px';
        } else {
            this.ySliderHorizontal.style.left = 0 + 'px';
        }
    }

    countDelta() {
        this.delta = (this.scrollHeight - this.yBarHeight)/(this.yBarHeight - this.ySliderHeightFull);
        this.ySliderWrapVisible = (this.scrollHeight - this.yBarHeight) >= 1;
    }

    countDeltaHorizontal() {
         this.deltaHorizontal = (this.scrollWidth - this.yBarWidth)/(this.yBarWidth - this.ySliderHorizontalWidthFull);
         this.ySliderHorizontalWrapVisible = (this.scrollWidth - this.yBarWidth) >= 1;

        if (this.objHeight === this.scroll.offsetHeight) {
            this.scroll.style.marginBottom = -this.scrollbarWidth + 'px';
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.scrollStartBind = this.scrollStart.bind(this);
            this.mouseWheelBind = this.mouseWheel.bind(this);
            this.scrollStartXBind = this.scrollStartX.bind(this);
            this.mouseMoveBind = this.mouseMove.bind(this);
            this.mouseUpBind = this.mouseUp.bind(this);
            this.windowResizeBind = this.windowResize.bind(this);
            this.mouseScrollBind = this.mouseScroll.bind(this);
            this.clickBind = this.click.bind(this);
            this.clickHorizontalBind = this.clickHorizontal.bind(this);
            this.autoResizeBind = this.autoResize.bind(this);
            this.autoResizeEndBind = this.autoResizeEnd.bind(this);

            this.ySlider.addEventListener('mousedown', this.scrollStartBind);
            this.ySlider.addEventListener('touchstart', this.scrollStartBind);

            this.ySliderWrap.addEventListener('DOMMouseScroll', this.mouseWheelBind);
            this.ySliderWrap.addEventListener('mousewheel', this.mouseWheelBind);
            this.ySliderWrap.addEventListener('MozMousePixelScroll', this.mouseWheelBind);

            this.ySliderHorizontal.addEventListener('mousedown', this.scrollStartXBind);
            this.ySliderHorizontal.addEventListener('touchstart', this.scrollStartXBind);

            this.ySliderHorizontalWrap.addEventListener('DOMMouseScroll', this.mouseWheelBind);
            this.ySliderHorizontalWrap.addEventListener('mousewheel', this.mouseWheelBind);
            this.ySliderHorizontalWrap.addEventListener('MozMousePixelScroll', this.mouseWheelBind);

            this.doc.addEventListener('mousemove', this.mouseMoveBind);
            this.doc.addEventListener('touchmove', this.mouseMoveBind);

            this.doc.addEventListener('mouseup', this.mouseUpBind);
            this.doc.addEventListener('touchend', this.mouseUpBind);

            this.win.addEventListener('resize', this.windowResizeBind);

            this.scroll.addEventListener('scroll', this.mouseScrollBind);

            this.ySliderWrap.addEventListener('mousedown', this.clickBind);
            this.ySliderWrap.addEventListener('touchstart', this.clickBind);

            this.ySliderHorizontalWrap.addEventListener('mousedown', this.clickHorizontalBind);
            this.ySliderHorizontalWrap.addEventListener('touchstart', this.clickHorizontalBind);

            this.obj.addEventListener('mouseenter', this.autoResizeBind);
            this.obj.addEventListener('touchstart', this.autoResizeBind);
            this.obj.addEventListener('mouseleave', this.autoResizeEndBind);
            this.obj.addEventListener('touchend', this.autoResizeEndBind);
        });
    }

    ngOnDestroy() {
        this.ySlider.removeEventListener('mousedown', this.scrollStartBind);
        this.ySlider.removeEventListener('touchstart', this.scrollStartBind);

        this.ySliderWrap.removeEventListener('DOMMouseScroll', this.mouseWheelBind);
        this.ySliderWrap.removeEventListener('mousewheel', this.mouseWheelBind);
        this.ySliderWrap.removeEventListener('MozMousePixelScroll', this.mouseWheelBind);

        this.ySliderHorizontal.removeEventListener('mousedown', this.scrollStartXBind);
        this.ySliderHorizontal.removeEventListener('touchstart', this.scrollStartXBind);

        this.ySliderHorizontalWrap.removeEventListener('DOMMouseScroll', this.mouseWheelBind);
        this.ySliderHorizontalWrap.removeEventListener('mousewheel', this.mouseWheelBind);
        this.ySliderHorizontalWrap.removeEventListener('MozMousePixelScroll', this.mouseWheelBind);

        this.doc.removeEventListener('mousemove', this.mouseMoveBind);
        this.doc.removeEventListener('touchmove', this.mouseMoveBind);

        this.doc.removeEventListener('mouseup', this.mouseUpBind);
        this.doc.removeEventListener('touchend', this.mouseUpBind);

        this.win.removeEventListener('resize', this.windowResizeBind);

        this.scroll.removeEventListener('scroll', this.mouseScrollBind);

        this.ySliderWrap.removeEventListener('mousedown', this.clickBind);
        this.ySliderWrap.removeEventListener('touchstart', this.clickBind);

        this.ySliderHorizontalWrap.removeEventListener('mousedown', this.clickHorizontalBind);
        this.ySliderHorizontalWrap.removeEventListener('touchstart', this.clickHorizontalBind);

        this.obj.removeEventListener('mouseenter', this.autoResizeBind);
        this.obj.removeEventListener('touchstart', this.autoResizeBind);
        this.obj.removeEventListener('mouseleave', this.autoResizeEndBind);
        this.obj.removeEventListener('touchend', this.autoResizeEndBind);
    }

    windowResize() {
        clearTimeout(this.windowResizeTimeoutID);
        this.windowResizeTimeoutID = window.setTimeout(() => {
            this.hideNativeScrolls();
        }, 300);
    }

    scrollStart(e: MouseEvent) {
        e.stopPropagation();
        this.canDrag = true;
        this.startPoint = e.pageY;
        this.startPosition =  this.ySlider.offsetTop;

        this.turnOffSelection(this.scroll);
    }

    scrollStartX(e: MouseEvent) {
        e.stopPropagation();

        this.canDragX = true;
        this.startPointX = e.pageX;
        this.startPositionX = this.ySliderHorizontal.offsetLeft;

        this.turnOffSelection(this.scroll);
    }

    click(e: MouseEvent) {
        if (this.canDrag) return;

        let pageY = e.pageY,
            offsetTop = e.currentTarget["getBoundingClientRect"]().top,
            diff = pageY - offsetTop - this.ySliderHeight;

        this.scroll.scrollTop = diff*this.delta;
    }

    clickHorizontal(e: MouseEvent) {
        if (this.canDragX) return;

        let pageX = e.pageX,
            offsetLeft = e.currentTarget["getBoundingClientRect"]().lelft,
            diff = pageX - offsetLeft - this.ySliderHorizontalWidth;

        this.scroll.scrollLeft = diff*this.deltaHorizontal;
    }

    isMobile() {
        return (/android|webos|iphone|ipad|ipod|blackberry|Windows Phone/i.test(navigator.userAgent));
    }

    mouseWheel(e: any) {
        let sliderResult, blockResult,
            curY = this.ySlider.offsetTop;

        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            this.direction = 'down';
        } else {
            this.direction = 'up';
        }

        if (curY > this.yEdgeBtm - this.SCROLL_RATIO && this.direction === "down") {
            sliderResult = this.yEdgeBtm + 'px';
            blockResult = this.scrollHeight;
        } else if (curY < 0) {
            sliderResult = 0;
            blockResult = 0;
        } else if (curY  < this.yEdgeBtm && this.direction === "down") {
            sliderResult = curY + this.SCROLL_RATIO + 'px';
            blockResult = (curY + this.SCROLL_RATIO) * this.delta;
        } else if (this.direction === "up" && curY > 0) {
            sliderResult = curY - this.SCROLL_RATIO + 'px';
            blockResult = (curY - this.SCROLL_RATIO) * this.delta;
        }

        this.ySlider.style.top = sliderResult;
        this.scroll.scrollTo(blockResult);

        return false;
    }

    mouseMove(e: MouseEvent) {

        if(!this.canDrag && !this.canDragX) return;

        if (this.canDrag) {

            let diff1 = e.pageY - this.startPoint,
                diff = diff1 + this.startPosition,
                sliderResult, blockResult;

            if (diff1 < 0 && Math.abs(diff1) >= this.startPosition) {
                sliderResult = 0;
                blockResult = 0;
            } else if(diff1 > 0 && diff1 >= this.yEdgeBtm - this.startPosition) {
                sliderResult = this.yEdgeBtm + 'px';
                blockResult = this.scrollHeight;
            } else {
                sliderResult = diff + 'px';
                blockResult = diff*this.delta;
            }

            this.ySlider.style.top = sliderResult;
            this.scroll.scrollTop = blockResult;

        } else if (this.canDragX) {

            let diffX1 = e.pageX - this.startPointX,
                diffX = diffX1 + this.startPositionX,
                sliderResultX, blockResultX;

            if (diffX1 < 0 && Math.abs(diffX1) >= this.startPositionX) {
                sliderResultX = 0;
                blockResultX = 0;
            } else if(diffX1 > 0 && diffX1 >= this.yEdgeRight - this.startPositionX) {
                sliderResultX = this.yEdgeRight + 'px';
                blockResultX = this.scrollWidth;
            } else {
                sliderResultX = diffX + 'px';
                blockResultX = diffX * this.deltaHorizontal;
            }

            this.ySliderHorizontal.style.left = sliderResultX;
            this.scroll.scrollLeft = blockResultX;

        }

        e.preventDefault();
    }

    mouseUp() {
        this.canDrag = false;
        this.canDragX = false;

        this.turnOnSelection(this.scroll);
    }

    mouseScroll(e: Event) {
        if (this.canDrag) return;

        this.ySlider.style.top = this.scroll.scrollTop/this.delta + 'px';
        this.ySliderHorizontal.style.left = this.scroll.scrollLeft/this.deltaHorizontal + 'px';
    }

    turnOffSelection(el: HTMLElement) {
        el.setAttribute('unselectable','on');
        el.classList.add('_unselectable');
    }

    turnOnSelection(el: HTMLElement) {
        el.removeAttribute('unselectable');
        el.classList.remove('_unselectable');
    }

    autoResize() {
        let self = this,
            tempScrollHeight, tempObjHeight, tempScrollWidth, tempObjWidth;

        this.autoResizeFlag = true;
        this.timeoutID = window.setTimeout(function resize() {

            self.zone.run(() => {

                tempScrollHeight = self.scroll.scrollHeight;
                tempScrollWidth = self.scroll.scrollWidth;
                tempObjHeight = self.obj.offsetHeight;
                tempObjWidth = self.obj.offsetWidth;

                if (self.obj && ((tempScrollHeight !== self.scrollHeight || tempObjHeight !== self.objHeight) ||
                    (tempScrollWidth !== self.scrollWidth || tempObjWidth !== self.yBarWidth))) {

                    self.updateVars();
                    self.objHeight = tempObjHeight;
                    self.yBarWidth = tempObjWidth;
                }

                if (self.autoResizeFlag) window.setTimeout(resize, 1000);

            });

        }, 300);
    }

    autoResizeEnd() {
        this.autoResizeFlag = false;
        clearInterval(this.timeoutID);
    }
}