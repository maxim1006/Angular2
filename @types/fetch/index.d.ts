//когда нужна сущность, которую могу вызывать использую declare
interface Response{
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}

interface ResponseBody{
    blob: Blob;
    formData: FormData;
}

interface ResponseInit{
    status: string;
    statusText: string;
}

interface InitRequest {
    method: string,
    body: Blob | FormData | string
}

interface Request {
    method: string,
    url: string
}

declare const Response: {
    prototype: Response;
    new (body: ResponseBody, init: ResponseInit):Response;
};

declare const Request: {
    prototype: Request;
    new (input:string | Request, init: InitRequest):Request;
};

declare function fetch(input:any, init?:InitRequest):Promise<Response>;