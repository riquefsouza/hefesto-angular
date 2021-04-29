import { ErrorService } from './../../base/services/error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdmParameterCategory } from '../models/AdmParameterCategory';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AdmParameterCategoryService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService) {
        this.PATH = environment.apiURL + '/admParameterCategory';
    }

    public findIndexById(listaAdmParameterCategory: AdmParameterCategory[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmParameterCategory.length; i++) {
            if (listaAdmParameterCategory[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
/*
    public async findAll(): Promise<AdmParameterCategory[]> {
        const res = await this.http.get<AdmParameterCategory[]>('assets/data/admParameterCategory.json')
            .toPromise();
        return res;
    }

    public findById(id: number): Promise<AdmParameterCategory> {
        const res = new Promise<AdmParameterCategory>((resolve, reject) => {
            let lista: AdmParameterCategory[] = [];

            this.findAll()
                .then(parameterCategories => {
                    lista = parameterCategories.filter(parameterCategory => parameterCategory.id === id);
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
        const res = await this.http.get<AdmParameterCategory[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmParameterCategory[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmParameterCategory[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmParameterCategory> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmParameterCategory>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmParameterCategory): Promise<AdmParameterCategory> {
        const url = this.PATH;
        const res = await this.http.post<AdmParameterCategory>(url, obj, this.errorService.httpOptions)
        .pipe(
            tap((newObj: AdmParameterCategory) => this.errorService.log(`insert AdmParameterCategory id=${newObj.id}`)),
            catchError(this.errorService.handleError<AdmParameterCategory>('insert AdmParameterCategory'))
            )
        .toPromise();

        return res;
    }

    public async update(obj: AdmParameterCategory): Promise<AdmParameterCategory> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmParameterCategory>(url, obj, this.errorService.httpOptions)
        .pipe(
            tap(_ => this.errorService.log(`update AdmParameterCategory id=${obj.id}`)),
            catchError(this.errorService.handleError<AdmParameterCategory>('update AdmParameterCategory'))
            )
        .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
        .pipe(
            tap(_ => this.errorService.log(`delete AdmParameterCategory id=${id}`)),
            catchError(this.errorService.handleError<any>('delete AdmParameterCategory'))
            )
        .toPromise();

        return res;
    }
}
