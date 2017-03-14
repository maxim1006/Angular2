import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";

declare const Reflect: any;

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {});
