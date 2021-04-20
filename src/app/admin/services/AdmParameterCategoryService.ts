import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdmParameterCategory } from '../models/AdmParameterCategory';

@Injectable()
export class AdmParameterCategoryService {

    constructor(private http: HttpClient) { }

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

    public async findAll(): Promise<AdmParameterCategory[]> {
        const res = await this.http.get<any>('assets/data/admParameterCategory.json')
            .toPromise();
        return <AdmParameterCategory[]>res;
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
}
