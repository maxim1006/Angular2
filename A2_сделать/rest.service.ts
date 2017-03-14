import { Injectable } from "@angular/core";

@Injectable()

export class RestService {
    constructor() {}

    paramResourseId: string = '&p_p_resource_id=';
    portlets:        any = window['nc_Portlets'];

    getUrl(portletId:string, params:any) {
        let url = '',
            key;

        for (key in params) if (params.hasOwnProperty(key)) {
            url += '&_' + portletId + '_' + key + '=' + encodeURIComponent(params[key]);
        }

        return url;
    }

    getPath(portlet:any, _params:any, methodName:string) {
        if (portlet) {
            return portlet.resourceUrl + this.getUrl(portlet.id, _params) + this.paramResourseId + methodName;
        }
    }

    findPortlet(portletName:string) {
        if (this.portlets && Array.isArray(this.portlets) && this.portlets.length > 0) {

            for (let i = 0; i < this.portlets.length; i++) {
                if (this.portlets[i].id === (portletName + '_WAR_telenetportalwar')) {
                    return this.portlets[i];
                }
            }
        }
    }

}