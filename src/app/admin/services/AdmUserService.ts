import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';

import { AdmUser } from '../models/AdmUser';
import { AdmProfileService } from './AdmProfileService';

@Injectable()
export class AdmUserService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService,
        private admProfileService: AdmProfileService) {
        this.PATH = environment.apiURL + '/admUser';
    }

    public findIndexById(listaAdmUser: AdmUser[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmUser.length; i++) {
            if (listaAdmUser[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*

    public async findAll(): Promise<AdmUser[]> {
        const res = await this.http.get<any>('assets/data/admUser.json')
            .toPromise();
        return <AdmUser[]>res;
    }

    public findById(id: number): Promise<AdmUser> {
        const res = new Promise<AdmUser>((resolve, reject) => {
            let lista: AdmUser[] = [];

            this.findAll()
                .then(users => {
                    lista = users.filter(user => user.id === id);
                    resolve(lista[0]);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }

    public findAllWithProfiles(): Promise<AdmUser[]> {
        const res = new Promise<AdmUser[]>((resolve, reject) => {

            this.findAll().then(users => {
                users.forEach(user => {
                    user.userProfiles = '';

                    user.admIdProfiles.forEach(idProfile => {

                        this.admProfileService.findById(idProfile).then(profile => {
                            user.userProfiles += profile.description + ', ';
                        })
                        .catch(erro => {
                            reject(erro);
                        });

                    });
                });
                resolve(users);
            })
            .catch(erro => {
                reject(erro);
            });

        });

        return res;
    }
    */

    public async findAllPaginated(page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        const url = `${this.PATH}/paged`;
        const res = await this.http.get<AdmUser[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmUser[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmUser[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmUser> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmUser>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmUser): Promise<AdmUser> {
        const url = this.PATH;
        const res = await this.http.post<AdmUser>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: AdmUser) => this.errorService.log(`insert AdmUser id=${newObj.id}`)),
                catchError(this.errorService.handleError<AdmUser>('insert AdmUser'))
            )
            .toPromise();

        return res;
    }

    public async update(obj: AdmUser): Promise<AdmUser> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmUser>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap(_ => this.errorService.log(`update AdmUser id=${obj.id}`)),
                catchError(this.errorService.handleError<AdmUser>('update AdmUser'))
            )
            .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
            .pipe(
                tap(_ => this.errorService.log(`delete AdmUser id=${id}`)),
                catchError(this.errorService.handleError<any>('delete AdmUser'))
            )
            .toPromise();

        return res;
    }

}
