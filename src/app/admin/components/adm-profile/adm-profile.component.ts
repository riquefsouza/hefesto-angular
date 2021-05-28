import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmProfile } from '../../models/AdmProfile';
import { AdmProfileService } from '../../services/AdmProfileService';
import { ExportService } from 'src/app/base/services/export.service';
import { ReportParamForm } from 'src/app/base/models/ReportParamsForm';
import { ItypeReport } from 'src/app/base/services/ReportService';

@Component({
  selector: 'app-adm-profile',
  templateUrl: './adm-profile.component.html',
  styleUrls: ['./adm-profile.component.css'],
  providers: [MessageService, AdmProfileService]
})
export class AdmProfileComponent implements OnInit {

  listaAdmProfile: AdmProfile[];

  admProfile: AdmProfile;

  selectedAdmProfile: AdmProfile;

  submitted: boolean;

  cols: any[];

  exportColumns: any[];

  reportParamForm: ReportParamForm;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admProfileService: AdmProfileService,
    private router: Router,
    private storageService: StorageService,
    private exportService: ExportService) {
      this.reportParamForm = {
        reportType: 'PDF',
        forceDownload: true
      };
    }

  ngOnInit(): void {
    this.admProfileService
      .findAll()
      .then(data => this.listaAdmProfile = data);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'description', header: 'Description' },
      { field: 'profileUsers', header: 'User(s)' }
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
    this.admProfileService.report(this.reportParamForm).then(() => {
      this.messageService.add({severity: 'info', summary: 'Profile Exported', detail: 'Profile Exported', life: 1000});
    });
  }

  onInsert() {
    this.admProfile = {};
    this.submitted = false;

    // this.storageService.setStorage(this.admProfile);
    this.storageService.persistObj('admProfile', this.admProfile);
    this.router.navigate(['/admin/admProfileEdit']);
  }

  onEdit(admProfile: AdmProfile) {
    this.admProfile = { ...admProfile };

    // this.storageService.setStorage(this.admProfile);
    this.storageService.persistObj('admProfile', this.admProfile);
    this.router.navigate(['/admin/admProfileEdit']);
  }

  onDelete(admProfile: AdmProfile) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + admProfile.description + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.admProfileService.delete(admProfile.id).then(obj => {
            this.listaAdmProfile = this.listaAdmProfile.filter(val => val.id !== admProfile.id);
            this.admProfile = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Deleted', life: 3000 });
          });
        }
    });
  }

  exportPdf() {
    const head: string[] = [];
    const data: any[] = [];

    this.exportColumns.forEach(item => head.push(item.title));
    this.listaAdmProfile.forEach(item => data.push(
      [item.id, item.description, item.profileUsers]
    ));

    this.exportService.exportPdf(head, data, 'profiles.pdf');
  }

  exportExcel() {
    this.exportService.exportExcel(this.listaAdmProfile, 'profiles');
  }

}
