import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {RootComponent} from "./components/root.component";

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [RootComponent],
    providers: [
    ],
    bootstrap: [RootComponent]
})


export class NgMainModule {
}