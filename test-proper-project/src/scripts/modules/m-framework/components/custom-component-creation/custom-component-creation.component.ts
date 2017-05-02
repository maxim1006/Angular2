import {Component, ViewChild, ViewChildren, ElementRef, OnInit, Input, Compiler} from '@angular/core';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {
    ComponentFactory,
    ComponentRef
} from "../../../../../../node_modules/@angular/core/src/linker/component_factory";
import {AfterViewInit} from "../../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";
import {NgModule, ViewContainerRef} from '@angular/core';
import {MFrameworkModule} from "../../m-framework.module";
import {BrowserModule} from "@angular/platform-browser/";

@Component({
    selector: "custom-component-creation",
    templateUrl: "./custom-component-creation.component.html"
})

export class CustomComponentCreationComponent implements OnInit,AfterViewInit {

    @ViewChild("outerHtmlWrapper", {read: ViewContainerRef}) outerHtmlWrapper: ViewContainerRef;

    private static templateFactoryCache: {[key: string]: ComponentFactory<any>} = {};

    private htmlContent: SafeHtml;

    private componentRef: ComponentRef<any>;

    @Input()
    htmlContentOuter;

    constructor(private compiler: Compiler) {
    }

    ngOnInit() {
        this.htmlContent = `<span class="content">Inner html content from Controller</span>`;
    }

    ngAfterViewInit() {
        this.createComponent();
    }

    createComponent() {
        let self = this;

        if (self.componentRef) {
            self.componentRef.destroy();
        }

        if (self.htmlContentOuter) {
            (self.compileToComponent(self.htmlContentOuter)).then((factory: ComponentFactory<any>) => {
                self.componentRef = self.outerHtmlWrapper.createComponent(factory);
            });
        }

    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    private compileToComponent(template: string): Promise<ComponentFactory<any>> {
        let factory = CustomComponentCreationComponent.templateFactoryCache[template];

        if (factory) {
            return Promise.resolve(factory);
        } else {
            @Component({
                template: template,

            })
            class DynamicComponent {
            }

            @NgModule({
                imports: [BrowserModule, MFrameworkModule],
                declarations: [DynamicComponent]
            })
            class DynamicModule {
            }

            return this.compiler.compileModuleAndAllComponentsAsync(DynamicModule).then(
                module => {
                    let factory = module.componentFactories.find(x => x.componentType === DynamicComponent);
                    CustomComponentCreationComponent.templateFactoryCache[template] = factory;
                    return factory;
                }
            );
        }
    }
}