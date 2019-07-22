import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloningReq = req.clone({
            params: req.params.set('auth', this.authService.getToken())
        });
        return next.handle(cloningReq);
    }
}
