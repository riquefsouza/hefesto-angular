import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdmUser } from '../models/AdmUser';
import { AdmProfileService } from './AdmProfileService';

@Injectable()
export class AdmUserService {

    constructor(private http: HttpClient,
        private admProfileService: AdmProfileService) { }

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

}
