import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmUser } from '../models/AdmUser';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    public login(admUser: AdmUser): boolean {

        if (admUser.login !== '' && admUser.password !== '') {
            return true;
        }
        return false;
    }

}
