import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
import {enableProdMode} from "@angular/core";

declare const Reflect: any;

if (process.env.IS_STATIC_MODE) {
   console.log("******************You are in dev mode******************");
} else {
    enableProdMode();
    console.log("******************You are in prod mode******************");
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {});
