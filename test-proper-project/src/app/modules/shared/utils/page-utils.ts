import {OnDestroy, OnInit} from "@angular/core";
import {PageUtilsService} from "../services/page-utils.service";
import {Subscription} from "rxjs/Subscription";
import {Media} from "../models/media";

export abstract class PageUtils implements OnInit, OnDestroy {
    media: Media;

    mediaSubscription: Subscription;

    constructor(protected pageUtilsService: PageUtilsService) {}

    ngOnInit() {
        this.mediaSubscription = this.pageUtilsService.getMedia().subscribe((media: Media) => {
            this.media = media;
            console.log(this.media, ' this.media subscription');
        });
    }

    ngOnDestroy() {
        this.mediaSubscription && this.mediaSubscription.unsubscribe();
    }

}