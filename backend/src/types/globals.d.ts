
declare global{
    namespace Express{
     interface Request{
        user?:any
     }
    }
}

export interface ReqUser{
    id:string
    email:string;
}