import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";

declare const Reflect: any;

if (process.env.IS_STATIC_MODE) {
   console.log("******************You are in dev mode******************");
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {});
