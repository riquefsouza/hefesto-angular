import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdmMenu } from '../models/AdmMenu';
import { AdmPageService } from './AdmPageService';

@Injectable()
export class AdmMenuService {

    constructor(private http: HttpClient,
        private admPageService: AdmPageService) { }

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

}
