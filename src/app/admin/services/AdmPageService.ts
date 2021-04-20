import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdmPage } from '../models/AdmPage';
import { AdmProfile } from '../models/AdmProfile';
import { AdmProfileService } from './AdmProfileService';

@Injectable()
export class AdmPageService {

    constructor(private http: HttpClient,
        private admProfileService: AdmProfileService) { }

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

}
