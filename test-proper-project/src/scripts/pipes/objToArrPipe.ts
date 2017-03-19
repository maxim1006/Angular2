import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: "objToArrPipe"
})

export class objToArrPipe implements PipeTransform {

    public transform(value: any[] = [], name=''):any {
        let arr = [];

        Object.keys(value).forEach((key) => {
            console.log(key);
            console.log(value[key]);
            arr.push({
                key,
                value: value[key]
            });
        });

        return arr;
    }

}