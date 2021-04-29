import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmUser } from '../../models/AdmUser';
import { AdmUserService } from '../../services/AdmUserService';
import { ExportService } from 'src/app/base/services/export.service';

@Component({
  selector: 'app-adm-user',
  templateUrl: './adm-user.component.html',
  styleUrls: ['./adm-user.component.css'],
  providers: [MessageService, AdmUserService]
})
export class AdmUserComponent implements OnInit {

  listaAdmUser: AdmUser[];

  admUser: AdmUser;

  selectedAdmUser: AdmUser;

  submitted: boolean;

  cols: any[];

  exportColumns: any[];

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admUserService: AdmUserService,
    private router: Router,
    private storageService: StorageService,
    private exportService: ExportService) {}

  ngOnInit(): void {
    this.admUserService
      .findAll()
      .then(data => this.listaAdmUser = data);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'email', header: 'Email' },
      { field: 'login', header: 'Login' },
      { field: 'name', header: 'Name' },
      { field: 'userProfiles', header: 'User profile(s)' },
      { field: 'active', header: 'Active' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  onExport() {
    this.messageService.add({severity: 'info', summary: 'User Exported', detail: 'Users Exported', life: 1000});
  }

  onInsert() {
    this.admUser = {};
    this.submitted = false;

    // this.storageService.setStorage(this.admUser);
    this.storageService.persistObj('admUser', this.admUser);
    this.router.navigate(['/admUserEdit']);
  }

  onEdit(admUser: AdmUser) {
    this.admUser = { ...admUser };

    // this.storageService.setStorage(this.admUser);
    this.storageService.persistObj('admUser', this.admUser);
    this.router.navigate(['/admUserEdit']);
  }

  onDelete(admUser: AdmUser) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + admUser.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.admUserService.delete(admUser.id).then(obj => {
            this.listaAdmUser = this.listaAdmUser.filter(val => val.id !== admUser.id);
            this.admUser = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          });
        }
    });
  }

  exportPdf() {
    const head: string[] = [];
    const data: any[] = [];

    this.exportColumns.forEach(item => head.push(item.title));
    this.listaAdmUser.forEach(item => data.push(
      [item.id, item.email, item.login, item.name, item.userProfiles, item.active]
    ));

    this.exportService.exportPdf(head, data, 'users.pdf');
  }

  exportExcel() {
    this.exportService.exportExcel(this.listaAdmUser, 'users');
  }

}
