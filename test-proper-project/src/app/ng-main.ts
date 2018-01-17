//Dont use in AOT
/*
*
* Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
 Don’t use default exports.
 Don’t use form.controls.controlName, use form.get(‘controlName’)
 Don’t use control.errors?.someError, use control.hasError(‘someError’)
 Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
 Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public
* */

// получить сервис через инжектор
// this.authService = this.injector.get(AuthService); // get it here within intercept

import './ng-polyfills';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
import {enableProdMode} from "@angular/core";
import {bootloader} from "@angularclass/hmr";

declare const Reflect: any;

if (process.env.STATIC) {
    console.log("******************You are in Dev mode******************");
    platformBrowserDynamic().bootstrapModule(AppModule).then(():any => {});
} else if (process.env.HMR) {
   console.log("******************You are in HMR mode******************");
    bootloader(main);
} else {
    console.log("******************You are in prod mode******************");

    enableProdMode();

    platformBrowserDynamic().bootstrapModule(AppModule).then(():any => {});
}

export function main() {
    return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then((modRef: any) => {
            console.log(modRef, ' moderef');   //moderef = AppModuleInjector
            return modRef
        })
        .catch(err => console.error(err));
}

// boot on document ready

