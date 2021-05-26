import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { tap, catchError } from 'rxjs/operators';
import { ReportParamForm } from 'src/app/base/models/ReportParamsForm';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';

import { AdmPage } from '../models/AdmPage';
import { AdmProfileService } from './AdmProfileService';

@Injectable()
export class AdmPageService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService,
        private admProfileService: AdmProfileService) {
        this.PATH = environment.apiURL + '/admPage';
    }

    public findIndexById(listaAdmPage: AdmPage[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmPage.length; i++) {
            if (listaAdmPage[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*
    public async findAll(): Promise<AdmPage[]> {
        const res = await this.http.get<any>('assets/data/admPage.json')
            .toPromise();
        return res;
    }

    public findById(id: number): Promise<AdmPage> {
        const res = new Promise<AdmPage>((resolve, reject) => {
            let lista: AdmPage[] = [];

            this.findAll()
                .then(pages => {
                    lista = pages.filter(page => page.id === id);
                    resolve(lista[0]);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }

    public findAllWithProfiles(): Promise<AdmPage[]> {
        const res = new Promise<AdmPage[]>((resolve, reject) => {

            this.findAll().then(pages => {
                pages.forEach(page => {
                    page.pageProfiles = '';

                    page.admIdProfiles.forEach(idProfile => {

                        this.admProfileService.findById(idProfile).then(profile => {
                            page.pageProfiles += profile.description + ', ';
                        })
                        .catch(erro => {
                            reject(erro);
                        });

                    });
                });
                resolve(pages);
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
        const res = await this.http.get<AdmPage[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmPage[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmPage[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmPage> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmPage>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmPage): Promise<AdmPage> {
        const url = this.PATH;
        const res = await this.http.post<AdmPage>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: AdmPage) => this.errorService.log(`insert AdmPage id=${newObj.id}`)),
                catchError(this.errorService.handleError<AdmPage>('insert AdmPage'))
            )
            .toPromise();

        return res;
    }

    public async update(obj: AdmPage): Promise<AdmPage> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmPage>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap(_ => this.errorService.log(`update AdmPage id=${obj.id}`)),
                catchError(this.errorService.handleError<AdmPage>('update AdmPage'))
            )
            .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
            .pipe(
                tap(_ => this.errorService.log(`delete AdmPage id=${id}`)),
                catchError(this.errorService.handleError<any>('delete AdmPage'))
            )
            .toPromise();

        return res;
    }

    public async report(obj: ReportParamForm): Promise<any> {
        const url = `${this.PATH}/report`;
        const res = await this.http.post(url, obj, {
            headers: this.errorService.httpOptions.headers,
            responseType: 'blob'
        })
        .pipe(
            tap(
              data => FileSaver.saveAs(data, 'AdmPage.' + obj.reportType.toLowerCase()),
              error => this.errorService.log(`report AdmPage: ${error}`)
            ),
            catchError(this.errorService.handleError<any>('report AdmPage'))
          )
        .toPromise();

        return res;
    }

}
