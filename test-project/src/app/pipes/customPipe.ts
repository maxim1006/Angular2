import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: "custom"
})

export class CustomPipe implements PipeTransform {

    public transform(value: any[], name=''):any {
        console.log(value);
        return value.filter(member => member.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }

}