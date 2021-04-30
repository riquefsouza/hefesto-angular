import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.tokenService.hasToken()) {
            const authToken = 'Bearer ' + this.tokenService.getToken();
            /*
            req = req.clone({
                setHeaders: {
                    'x-access-token': authToken
                }
            });
            */
            req = req.clone({
                headers: req.headers.set('Authorization', authToken)
            });
        }

        return next.handle(req);
    }
}
