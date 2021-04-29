import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdmParameter } from '../../models/AdmParameter';
import { AdmParameterCategory } from '../../models/AdmParameterCategory';
import { AdmParameterCategoryService } from '../../services/AdmParameterCategoryService';
import { AdmParameterService } from '../../services/AdmParameterService';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/base/services/StorageService';
import { ExportService } from 'src/app/base/services/export.service';

@Component({
  selector: 'app-adm-parameter',
  templateUrl: './adm-parameter.component.html',
  styleUrls: ['./adm-parameter.component.css'],
  providers: [ConfirmationService, MessageService, AdmParameterService,
  AdmParameterCategoryService]
})
export class AdmParameterComponent implements OnInit {

  listaAdmParameter: AdmParameter[];

  admParameter: AdmParameter;

  selectedAdmParameter: AdmParameter;

  submitted: boolean;

  listaAdmParameterCategory: AdmParameterCategory[];

  cols: any[];

  exportColumns: any[];

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admParameterService: AdmParameterService,
    private admParameterCategoryService: AdmParameterCategoryService,
    private router: Router,
    private storageService: StorageService,
    private exportService: ExportService) {}

  ngOnInit(): void {
    this.admParameterCategoryService
      .findAll()
      .then(data => this.listaAdmParameterCategory = data);

    this.admParameterService
      .findAll()
      .then(data => this.listaAdmParameter = data);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'admParameterCategory.description', header: 'Parameter Category' },
      { field: 'code', header: 'Parameter' },
      { field: 'value', header: 'Value' },
      { field: 'description', header: 'Description' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  onExport() {
    this.messageService.add({severity: 'info', summary: 'Parameter Exported', detail: 'Parameters Exported', life: 1000});
  }

  onInsert() {
    this.admParameter = {};
    this.submitted = false;

    // this.storageService.setStorage(this.admParameter);
    this.storageService.persistObj('admParameter', this.admParameter);
    this.router.navigate(['/admParameterEdit']);
  }

  onEdit(admParameter: AdmParameter) {
    this.admParameter = { ...admParameter };

    // this.storageService.setStorage(this.admParameter);
    this.storageService.persistObj('admParameter', this.admParameter);
    this.router.navigate(['/admParameterEdit']);
  }

  onDelete(admParameter: AdmParameter) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + admParameter.description + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.admParameterService.delete(admParameter.id).then(obj => {
            this.listaAdmParameter = this.listaAdmParameter.filter(val => val.id !== admParameter.id);
            this.admParameter = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parameter Deleted', life: 3000 });
          });
        }
    });
  }

  exportPdf() {
    const head: string[] = [];
    const data: any[] = [];

    this.exportColumns.forEach(item => head.push(item.title));
    this.listaAdmParameter.forEach(item => data.push(
      [item.id, item.admParameterCategory.description, item.code, item.value, item.description]
    ));

    this.exportService.exportPdf(head, data, 'Parameters.pdf');
  }

  exportExcel() {
    this.exportService.exportExcel(this.listaAdmParameter, 'Parameters');
  }

}
