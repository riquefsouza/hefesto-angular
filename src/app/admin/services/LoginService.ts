import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { emptyLoginForm, LoginForm } from 'src/app/base/models/LoginForm';
import { TokenDTO } from 'src/app/base/models/TokenDTO';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';
import { AdmUser } from '../models/AdmUser';
import { UserService } from 'src/app/base/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    private PATH: string;

    constructor(private http: HttpClient,
        private errorService: ErrorService,
        private userService: UserService,
        private router: Router) {
        this.PATH = environment.url;
    }

    public login(admUser: AdmUser): boolean {
        const loginForm: LoginForm = emptyLoginForm;

        if (admUser.login !== '' && admUser.password !== '') {
            loginForm.login = admUser.login;
            loginForm.password = admUser.password;

            this.auth(loginForm).then((obj: TokenDTO) => {
                this.userService.setToken(obj.token);
                console.log(`User ${admUser.login} authenticated with token ${obj.token}`);

                // this.router.navigate(['user', admUser.name]);
                this.router.navigate(['']);

                return true;
            });
        }
        return false;
    }

    public async auth(obj: LoginForm): Promise<TokenDTO> {
        const url = this.PATH + '/auth';
        const res = await this.http.post<TokenDTO>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: TokenDTO) => this.errorService.log(`auth token=${newObj.token}`)),
                catchError(this.errorService.handleError<TokenDTO>('auth'))
            )
            .toPromise();

        return res;
    }


}
