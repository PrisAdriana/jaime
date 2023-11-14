import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_KEY = 'f40b8a6ef79615e3fb983f7ecf12ec47';
const API_TOKEN = 'ATTA2a175f0b26058b02eb709a85ec4162478ddce550db50a28a078dee322c4588c8326519D4';

@Injectable({providedIn: 'root'})
export class TokenInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders : {
                Accept: 'application/json',
                'Authorization': 
                    'OAuth oauth_consumer_key="' + API_KEY + '", oauth_token="'+ API_TOKEN +'"'
                    //OAuth oauth_consumer_key="12345", oauth_token="12345"
            }
        });

        return next.handle(req);
    }
}