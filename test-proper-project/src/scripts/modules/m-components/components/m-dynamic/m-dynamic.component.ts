import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, Type, ViewChild} from "@angular/core";
import {MDynamicDirective} from "./m-dynamic.directive";

@Component({
    selector: 'm-dynamic',
    template: `<ng-template m-dynamic></ng-template>`
})
export class MDynamicComponent implements OnDestroy {
    _model: MDynamicComponentConstructor;

    @Input()
    public set componentModel(value: MDynamicComponentConstructor) {
        this._model = value;
        this._createComponent();
    }
    public get componentModel() {
        return this._model;
    }

    private _componentRef: ComponentRef<any>;

    @ViewChild(MDynamicDirective) mDynamic: MDynamicDirective;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

    private _createComponent() {
        let model = this.componentModel,
            data;

        if (!model) {
            console.log("Please add componentModel to m-dynamic");
            return;
        }

        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(model.component),
            viewContainerRef = this.mDynamic.viewContainerRef;
        
        viewContainerRef.clear();

        this._componentRef = viewContainerRef.createComponent(componentFactory);

        data = model.data;

        if (data) {
            Object.keys(data).forEach((key: string) => {
                (<MDynamicComponentData>this._componentRef.instance)[key] = data[key];
            });
        }
    }

    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }

}



export class MDynamicComponentConstructor {
    constructor(public component: Type<any>, public data: any) {}
}

export interface MDynamicComponentData {
    data: any;
}


