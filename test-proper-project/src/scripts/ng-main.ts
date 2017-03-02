import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgMainModule} from "./modules/ng-main/ng-main.module";

declare const Reflect: any;

platformBrowserDynamic().bootstrapModule(NgMainModule).then(() => {});
