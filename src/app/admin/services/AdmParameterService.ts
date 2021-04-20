import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdmParameter } from '../models/AdmParameter';

@Injectable()
export class AdmParameterService {

    constructor(private http: HttpClient) { }

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
}
