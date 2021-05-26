import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { tap, catchError } from 'rxjs/operators';
import { ReportParamForm } from 'src/app/base/models/ReportParamsForm';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';

import { AdmParameter } from '../models/AdmParameter';

@Injectable()
export class AdmParameterService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService) {
        this.PATH = environment.apiURL + '/admParameter';
    }

    public findIndexById(listaAdmParameter: AdmParameter[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmParameter.length; i++) {
            if (listaAdmParameter[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    /*
    public async findAll(): Promise<AdmParameter[]> {
        const res = await this.http.get<any>('assets/data/admParameter.json')
            .toPromise();
        return <AdmParameter[]>res;
    }

    public findById(id: number): Promise<AdmParameter> {
        const res = new Promise<AdmParameter>((resolve, reject) => {
            let lista: AdmParameter[] = [];

            this.findAll()
                .then(parameters => {
                    lista = parameters.filter(parameter => parameter.id === id);
                    resolve(lista[0]);
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
        const res = await this.http.get<AdmParameter[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmParameter[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmParameter[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmParameter> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmParameter>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmParameter): Promise<AdmParameter> {
        const url = this.PATH;
        const res = await this.http.post<AdmParameter>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: AdmParameter) => this.errorService.log(`insert AdmParameter id=${newObj.id}`)),
                catchError(this.errorService.handleError<AdmParameter>('insert AdmParameter'))
            )
            .toPromise();

        return res;
    }

    public async update(obj: AdmParameter): Promise<AdmParameter> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmParameter>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap(_ => this.errorService.log(`update AdmParameter id=${obj.id}`)),
                catchError(this.errorService.handleError<AdmParameter>('update AdmParameter'))
            )
            .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
            .pipe(
                tap(_ => this.errorService.log(`delete AdmParameter id=${id}`)),
                catchError(this.errorService.handleError<any>('delete AdmParameter'))
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
              data => FileSaver.saveAs(data, 'AdmParameter.' + obj.reportType.toLowerCase()),
              error => this.errorService.log(`report AdmParameter: ${error}`)
            ),
            catchError(this.errorService.handleError<any>('report AdmParameter'))
          )
        .toPromise();

        return res;
    }

}
