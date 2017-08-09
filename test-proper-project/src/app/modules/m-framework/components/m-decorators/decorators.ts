export function decorator(...args) {
    console.log(args, ' decorator args');
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, ' target');
        console.log(propertyKey, ' propertyKey');
        console.log(descriptor, ' descriptor');
    }
}

export function decorator1(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, ' target1');
    console.log(propertyKey, ' propertyKey1');
    console.log(descriptor, ' descriptor1');
    target.a = 1;
}

