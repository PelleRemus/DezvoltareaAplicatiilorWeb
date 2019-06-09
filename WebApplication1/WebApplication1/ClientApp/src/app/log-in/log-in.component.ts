import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel, Token } from '../shared/security.models';

@Component({
    selector: 'log-in-component',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
    public loginModel: LoginModel = <LoginModel>{};
    public token: Token;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        @Inject('BASE_URL') private baseUrl: string) {

        this.token = JSON.parse(localStorage.getItem("token") as string);
    }

    loginUser() {
        this.httpClient.post<Token>(this.baseUrl + `api/Account/Login`, this.loginModel).subscribe(token => {
            localStorage.setItem("token", JSON.stringify(token));
            this.router.navigate(['/']);
        });
    }
}
