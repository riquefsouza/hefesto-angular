import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/base/services/error.service';
import { environment } from 'src/environments/environment';

import { AdmMenu } from '../models/AdmMenu';
import { AdmPageService } from './AdmPageService';

@Injectable()
export class AdmMenuService {

    private PATH: string;

    constructor(private http: HttpClient, private errorService: ErrorService,
        private admPageService: AdmPageService) {
        this.PATH = environment.apiURL + '/admMenu';
    }

    public findIndexById(listaAdmMenu: AdmMenu[], id: number): number {
        let index = -1;
        for (let i = 0; i < listaAdmMenu.length; i++) {
            if (listaAdmMenu[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    /*
    public async findAll(): Promise<AdmMenu[]> {
        const res = await this.http.get<any>('assets/data/admMenu.json')
            .toPromise();
        return <AdmMenu[]>res;
    }

    public findById(id: number): Promise<AdmMenu> {
        const res = new Promise<AdmMenu>((resolve, reject) => {
            let lista: AdmMenu[] = [];

            this.findAll()
                .then(menus => {
                    lista = menus.filter(page => page.id === id);
                    resolve(lista[0]);
                })
                .catch(erro => {
                    reject(erro);
                });
            }
        );

        return res;
    }

    public findAllWithPages(): Promise<AdmMenu[]> {
        const res = new Promise<AdmMenu[]>((resolve, reject) => {

            this.findAll().then(menus => {
                menus.forEach(menu => {
                    this.admPageService.findById(menu.idPage).then(page => menu.admPage = page);
                    this.findById(menu.idMenuParent).then(menuParent => menu.admMenuParent = menuParent);
                });
                resolve(menus);
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
        const res = await this.http.get<AdmMenu[]>(url, { params })
            .toPromise();
        return res;
    }

    public async findAll(): Promise<AdmMenu[]> {
        const url = this.PATH;
        const res = await this.http.get<AdmMenu[]>(url)
            .toPromise();
        return res;
    }

    public async findById(id: number): Promise<AdmMenu> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.get<AdmMenu>(url)
            .toPromise();
        return res;
    }

    public async insert(obj: AdmMenu): Promise<AdmMenu> {
        const url = this.PATH;
        const res = await this.http.post<AdmMenu>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap((newObj: AdmMenu) => this.errorService.log(`insert AdmMenu id=${newObj.id}`)),
                catchError(this.errorService.handleError<AdmMenu>('insert AdmMenu'))
            )
            .toPromise();

        return res;
    }

    public async update(obj: AdmMenu): Promise<AdmMenu> {
        const url = `${this.PATH}/${obj.id}`;
        const res = await this.http.put<AdmMenu>(url, obj, this.errorService.httpOptions)
            .pipe(
                tap(_ => this.errorService.log(`update AdmMenu id=${obj.id}`)),
                catchError(this.errorService.handleError<AdmMenu>('update AdmMenu'))
            )
            .toPromise();

        return res;
    }

    public async delete(id: number): Promise<any> {
        const url = `${this.PATH}/${id}`;
        const res = await this.http.delete(url)
            .pipe(
                tap(_ => this.errorService.log(`delete AdmMenu id=${id}`)),
                catchError(this.errorService.handleError<any>('delete AdmMenu'))
            )
            .toPromise();

        return res;
    }

}
