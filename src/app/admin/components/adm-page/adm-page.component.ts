import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmPage } from '../../models/AdmPage';
import { AdmPageService } from '../../services/AdmPageService';
import { ExportService } from 'src/app/base/services/export.service';
import { ReportParamForm } from 'src/app/base/models/ReportParamsForm';
import { ItypeReport } from 'src/app/base/services/ReportService';

@Component({
  selector: 'app-adm-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css'],
  providers: [MessageService, AdmPageService]
})
export class AdmPageComponent implements OnInit {

  listaAdmPage: AdmPage[];

  admPage: AdmPage;

  selectedAdmPage: AdmPage;

  submitted: boolean;

  cols: any[];

  exportColumns: any[];

  reportParamForm: ReportParamForm;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admPageService: AdmPageService,
    private router: Router,
    private storageService: StorageService,
    private exportService: ExportService) {
      this.reportParamForm = {
        reportType: 'PDF',
        forceDownload: true
      };
    }

  ngOnInit(): void {
    this.admPageService
      .findAll()
      .then(data => this.listaAdmPage = data);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'url', header: 'Page' },
      { field: 'description', header: 'Description' },
      { field: 'pageProfiles', header: 'Page profile(s)' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  onChangedTypeReport(typeReport: ItypeReport) {
    this.reportParamForm.reportType = typeReport.type;
  }

  onChangedForceDownload(forceDownload: boolean) {
    this.reportParamForm.forceDownload = forceDownload;
  }

  onExport() {
    this.admPageService.report(this.reportParamForm).then(() => {
      this.messageService.add({severity: 'info', summary: 'Page Exported', detail: 'Page Exported', life: 1000});
    });
  }

  onInsert() {
    this.admPage = {};
    this.submitted = false;

    // this.storageService.setStorage(this.admPage);
    this.storageService.persistObj('admPage', this.admPage);
    this.router.navigate(['/admPageEdit']);
  }

  onEdit(admPage: AdmPage) {
    this.admPage = { ...admPage };

    // this.storageService.setStorage(this.admPage);
    this.storageService.persistObj('admPage', this.admPage);
    this.router.navigate(['/admPageEdit']);
  }

  onDelete(admPage: AdmPage) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + admPage.description + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.admPageService.delete(admPage.id).then(obj => {
            this.listaAdmPage = this.listaAdmPage.filter(val => val.id !== admPage.id);
            this.admPage = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Page Deleted', life: 3000 });
          });
        }
    });
  }

  exportPdf() {
    const head: string[] = [];
    const data: any[] = [];

    this.exportColumns.forEach(item => head.push(item.title));
    this.listaAdmPage.forEach(item => data.push(
      [item.id, item.url, item.description, item.pageProfiles]
    ));

    this.exportService.exportPdf(head, data, 'pages.pdf');
  }

  exportExcel() {
    this.exportService.exportExcel(this.listaAdmPage, 'pages');
  }

}
