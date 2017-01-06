import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './components/app/AppComponent';
import {ElementLinkComponent} from "./components/element-link/ElementLinkComponent";
import {DataBindingComponent} from "./components/data-binding/DataBindingComponent";
import {InnerDataBindingComponent} from "./components/data-binding/inner/InnerDataBindingComponent";
import {ClassExampleComponent} from "./components/class-example/classExampleComponent";
import {AttributeExampleComponent} from "./components/attribute-example/attributeExampleComponent";
import {StyleExampleComponent} from "./components/style-example/styleExampleComponent";
import {EventExampleComponent} from "./components/event-example/eventExampleComponent";

@NgModule({
    declarations: [
        AppComponent,
        ElementLinkComponent,
        DataBindingComponent,
        InnerDataBindingComponent,
        ClassExampleComponent,
        AttributeExampleComponent,
        StyleExampleComponent,
        EventExampleComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
