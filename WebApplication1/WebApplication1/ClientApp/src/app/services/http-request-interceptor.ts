import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from '../shared/security.models';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token: Token = this.getToken();
        request = token ? request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token.value)
            }) : request;

        return next.handle(request).pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.router.navigate(['/log-in']);
                        return of<HttpEvent<HttpErrorResponse>>();
                    }

                    if (error.status === 403) {
                        this.router.navigate(['/forbidden']);
                        return of<HttpEvent<HttpErrorResponse>>();
                    }
                    return throwError(error);
                }
            )
        );
    }

    getToken(): Token | null {
        return this.validate(JSON.parse(localStorage.getItem("token") as string));
    }

    validate(token: Token | null): Token | null {
        if (token) {
            if (new Date(token.expiry) > new Date())
                return token;
        }
        return null;
    }
}