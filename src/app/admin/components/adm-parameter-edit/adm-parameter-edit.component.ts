import { cleanAdmParameter } from './../../models/AdmParameter';
import { Component, OnInit } from '@angular/core';
import { AdmParameter } from '../../models/AdmParameter';
import { AdmParameterCategory } from '../../models/AdmParameterCategory';
import { AdmParameterCategoryService } from '../../services/AdmParameterCategoryService';
import { AdmParameterService } from '../../services/AdmParameterService';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/base/services/StorageService';

@Component({
  selector: 'app-adm-parameter-edit',
  templateUrl: './adm-parameter-edit.component.html',
  styleUrls: ['./adm-parameter-edit.component.css'],
  providers: [AdmParameterService, AdmParameterCategoryService, MessageService]
})
export class AdmParameterEditComponent implements OnInit {

  admParameter: AdmParameter;

  submitted: boolean;

  listaAdmParameterCategory: AdmParameterCategory[];

  listaAdmParameter: AdmParameter[];

  constructor(private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private admParameterService: AdmParameterService,
    private admParameterCategoryService: AdmParameterCategoryService) {}

  ngOnInit(): void {
    this.admParameterCategoryService
      .findAll()
      .then(data => this.listaAdmParameterCategory = data);

    // this.admParameter = this.storageService.getStorage();
    this.admParameter = this.storageService.getPersistedObj('admParameter') as AdmParameter;

    this.admParameterService
    .findAll()
    .then(data => this.listaAdmParameter = data);
  }

  onClean() {
    this.admParameter = cleanAdmParameter;
  }

  onSave() {
    this.submitted = true;

    if (this.admParameter.description.trim()) {
        if (this.admParameter.id) {
            this.listaAdmParameter[
              this.admParameterService.findIndexById(this.listaAdmParameter, this.admParameter.id)] = this.admParameter;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Updated', life: 3000 });
        } else {
            this.admParameter.id = this.listaAdmParameter.length + 1;
            this.listaAdmParameter.push(this.admParameter);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Created', life: 3000 });
        }

        this.listaAdmParameter = [...this.listaAdmParameter];
        this.admParameter = {};
        this.router.navigate(['/admParameter']);
    }
  }

}
