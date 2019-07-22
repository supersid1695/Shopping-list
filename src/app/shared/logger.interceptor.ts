import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class Logger implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req).pipe(
            tap(logRes => {
                console.log(logRes);
            })
        );
    }
}
