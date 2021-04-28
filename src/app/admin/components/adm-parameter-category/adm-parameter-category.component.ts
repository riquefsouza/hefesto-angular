import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdmParameterCategory } from '../../models/AdmParameterCategory';
import { AdmParameterCategoryService } from '../../services/AdmParameterCategoryService';

@Component({
  selector: 'app-adm-parameter-category',
  templateUrl: './adm-parameter-category.component.html',
  styleUrls: ['./adm-parameter-category.component.css'],
  providers: [ConfirmationService, MessageService, AdmParameterCategoryService]
})
export class AdmParameterCategoryComponent implements OnInit {

  admParameterCategoryDialog: boolean;

  listaAdmParameterCategory: AdmParameterCategory[];

  admParameterCategory: AdmParameterCategory;

  selectedAdmParameterCategories: AdmParameterCategory[];

  submitted: boolean;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admParameterCategoryService: AdmParameterCategoryService) {}

  ngOnInit(): void {
    this.admParameterCategoryService.findAll().then(data => this.listaAdmParameterCategory = data);
  }

  onInsert() {
    this.admParameterCategory = {};
    this.submitted = false;
    this.admParameterCategoryDialog = true;
  }

  deleteSelected() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected parameter categories?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {


            this.listaAdmParameterCategory = this.listaAdmParameterCategory
              .filter(val => !this.selectedAdmParameterCategories.includes(val));
            this.selectedAdmParameterCategories = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Categories Deleted', life: 3000 });

        }
    });
  }

  onEdit(admParameterCategory: AdmParameterCategory) {
    this.admParameterCategory = { ...admParameterCategory };
    this.admParameterCategoryDialog = true;
  }

  onDelete(admParameterCategory: AdmParameterCategory) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + admParameterCategory.description + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.admParameterCategoryService.delete(admParameterCategory.id).then(obj => {
            this.listaAdmParameterCategory = this.listaAdmParameterCategory.filter(val => val.id !== admParameterCategory.id);
            this.admParameterCategory = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Category Deleted', life: 3000 });
          });
        }
    });
  }

  hideDialog() {
    this.admParameterCategoryDialog = false;
    this.submitted = false;
  }

  onSave() {
    this.submitted = true;

    if (this.admParameterCategory.description.trim()) {
        if (this.admParameterCategory.id) {
          this.admParameterCategoryService.update(this.admParameterCategory).then((obj: AdmParameterCategory) => {
            this.admParameterCategory = obj;
            this.listaAdmParameterCategory[this.admParameterCategoryService
              .findIndexById(this.listaAdmParameterCategory, this.admParameterCategory.id)] = this.admParameterCategory;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Category Updated', life: 3000 });
          });
        } else {
          this.admParameterCategoryService.insert(this.admParameterCategory).then((obj: AdmParameterCategory) => {
            // this.admParameterCategory.id = this.listaAdmParameterCategory.length + 1;
            this.admParameterCategory = obj;
            this.listaAdmParameterCategory.push(this.admParameterCategory);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Category Created', life: 3000 });
          });
        }

        this.listaAdmParameterCategory = [...this.listaAdmParameterCategory];
        this.admParameterCategoryDialog = false;
        this.admParameterCategory = {};
    }
  }

}
