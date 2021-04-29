import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';
import { AdmPage } from '../models/AdmPage';

import { AdmProfile } from '../models/AdmProfile';
import { AdmUser } from '../models/AdmUser';

@Injectable()
export class AdmProfileService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService) {
        this.PATH = environment.apiURL + '/admProfile';
    }

    public findIndexById(listaAdmProfile: AdmProfile[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmProfile.length; i++) {
            if (listaAdmProfile[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*
    public async findAll(): Promise<AdmProfile[]> {
        const res = await this.http.get<any>('assets/data/admProfile.json')
            .toPromise();
        return <AdmProfile[]>res;
    }

    public findById(id: number): Promise<AdmProfile> {
        const res = new Promise<AdmProfile>((resolve, reject) => {
            let lista: AdmProfile[] = [];

            this.findAll()
                .then(profiles => {
                    lista = profiles.filter(profile => profile.id === id);
                    resolve(lista[0]);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }

    public findProfilesByPage(admPage: AdmPage): Promise<AdmProfile[]> {
        const res = new Promise<AdmProfile[]>((resolve, reject) => {
            let lista: AdmProfile[] = [];

            this.findAll()
                .then(profiles => {
                    lista = profiles.filter(profile => {
                        return profile.admPages.filter(page => page.id === admPage.id).length > 0;
                    });
                    resolve(lista);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }

    public findAllWithUsers(): Promise<AdmProfile[]> {
        const res = new Promise<AdmProfile[]>((resolve, reject) => {

            this.findAll().then(profiles => {
                profiles.forEach(profile => {
                    profile.profileUsers = '';
                    profile.profilePages = '';

                    profile.admUsers.forEach(user => {
                        profile.profileUsers += user.name + ', ';
                    });
                    profile.admPages.forEach(page => {
                        profile.profilePages += page.description + ', ';
                    });
                });
                resolve(profiles);
            })
            .catch(erro => {
                reject(erro);
            });

        });

        return res;
    }

    public findProfilesByUser(admUser: AdmUser): Promise<AdmProfile[]> {
        const res = new Promise<AdmProfile[]>((resolve, reject) => {
            let lista: AdmProfile[] = [];

            this.findAll()
                .then(profiles => {
                    lista = profiles.filter(profile => {
                        return profile.admUsers.filter(user => user.id === admUser.id).length > 0;
                    });
                    resolve(lista);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }
    */

    public async findAllPaginated(page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        const url = `${this.PATH}/paged`;
        const res = await this.http.get<AdmProfile[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmProfile[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmProfile[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmProfile> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmProfile>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmProfile): Promise<AdmProfile> {
        const url = this.PATH;
        const res = await this.http.post<AdmProfile>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: AdmProfile) => this.errorService.log(`insert AdmProfile id=${newObj.id}`)),
                catchError(this.errorService.handleError<AdmProfile>('insert AdmProfile'))
            )
            .toPromise();

        return res;
    }

    public async update(obj: AdmProfile): Promise<AdmProfile> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmProfile>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap(_ => this.errorService.log(`update AdmProfile id=${obj.id}`)),
                catchError(this.errorService.handleError<AdmProfile>('update AdmProfile'))
            )
            .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
            .pipe(
                tap(_ => this.errorService.log(`delete AdmProfile id=${id}`)),
                catchError(this.errorService.handleError<any>('delete AdmProfile'))
            )
            .toPromise();

        return res;
    }

    public async findProfilesByPage(admPage: AdmPage): Promise<AdmProfile[]> {
        const url = `${this.PATH}/findProfilesByPage/${admPage.id}`;
        const res = await this.http.get<AdmProfile[]>(url)
            .toPromise();
        return res;
    }

    public async findProfilesByUser(admUser: AdmUser): Promise<AdmProfile[]> {
        const url = `${this.PATH}/findProfilesByUser/${admUser.id}`;
        const res = await this.http.get<AdmProfile[]>(url)
            .toPromise();
        return res;
    }
}
