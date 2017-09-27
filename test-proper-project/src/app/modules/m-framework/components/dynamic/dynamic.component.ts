import {
    Component,
    ViewChild,
    ViewContainerRef,
    Input,
    ComponentRef,
    Compiler,
    ComponentFactory,
    NgModule
} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";



@Component({
    selector: 'dynamic-component',
    template: `<ng-template #wrapper></ng-template>`
})
export class DynamicComponent {
    public static templateFactoryCache: {[key: string]: ComponentFactory<any>} = {};

    @ViewChild("wrapper", {read: ViewContainerRef}) wrapper: ViewContainerRef;
    private componentRef: ComponentRef<any>;

    private isViewInitialized: boolean = false;

    @Input()
    public template: string;

    @Input()
    public handlers: {[key: string]: (event: {}) => void};

    @Input()
    public data: {};

    constructor(private compiler: Compiler) {
    }

    ngAfterViewInit() {
        let self = this;
        self.isViewInitialized = true;
        self.createComponent();
    }

    private createComponent() {
        let self = this;
        if (self.isViewInitialized) {
            if (self.componentRef) {
                self.componentRef.destroy();
            }
            if (self.template) {
                (self.compileToComponent(self.template)).then((factory: ComponentFactory<any>) => {
                    self.componentRef = self.wrapper.createComponent(factory);

                    self.componentRef.instance.handlers = self.handlers;
                    self.componentRef.instance.data = self.data;
                });
            }
        }
    }

    ngOnDestroy() {
        let self = this;
        if (self.componentRef) {
            self.componentRef.destroy();
            self.componentRef = null;
        }
        self.isViewInitialized = false;
    }

    private compileToComponent(template: string): Promise<ComponentFactory<any>> {
        let factory = DynamicComponent.templateFactoryCache[template];
        if (factory) {
            return Promise.resolve(factory);
        } else {
            @Component({
                template: template,

            })
            class MDynamicComponent {
                @Input()
                public handlers: {[key: string]: (event: {}) => void};

                @Input()
                public data: {};
            }

            @NgModule({
                imports: [BrowserModule],
                declarations: [MDynamicComponent]
            })
            class DynamicModule {
            }

            return this.compiler.compileModuleAndAllComponentsAsync(DynamicModule).then(
                module => {
                    let factory = module.componentFactories.find(x => x.componentType === MDynamicComponent);
                    DynamicComponent.templateFactoryCache[template] = factory;
                    return factory;
                }
            );
        }
    }
}
