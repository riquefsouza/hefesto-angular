import { AdmPage } from './../../models/AdmPage';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdmMenu } from '../../models/AdmMenu';
import { AdmMenuService } from '../../services/AdmMenuService';
import { TreeNode } from 'primeng/api';
import { AdmPageService } from '../../services/AdmPageService';
import { ReportParamForm } from 'src/app/base/models/ReportParamsForm';
import { ItypeReport } from 'src/app/base/services/ReportService';

@Component({
  selector: 'app-adm-menu',
  templateUrl: './adm-menu.component.html',
  styleUrls: ['./adm-menu.component.css'],
  providers: [ConfirmationService, MessageService, AdmMenuService, AdmPageService]
})
export class AdmMenuComponent implements OnInit {

  admMenuDialog: boolean;

  listaAdmMenu: AdmMenu[];

  admMenu: AdmMenu;

  selectedAdmMenu: AdmMenu;

  submitted: boolean;

  cols: any[];

  exportColumns: any[];

  listaNodeMenu: TreeNode[];

  selectedNodeMenu: TreeNode;

  menuRoot: TreeNode;

  listaAdmPage: AdmPage[];

  listaAdmMenuParent: AdmMenu[];

  reportParamForm: ReportParamForm;

  constructor(private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private admMenuService: AdmMenuService,
    private admPageService: AdmPageService) {
    this.reportParamForm = {
      reportType: 'PDF',
      forceDownload: true
    };
  }

  ngOnInit(): void {
    this.admPageService
      .findAll()
      .then(data => this.listaAdmPage = data);

    this.admMenuService
      .findAll()
      .then(data => {
        this.listaAdmMenu = data;

        this.listaAdmMenuParent = this.listaAdmMenu.filter(menu => menu.idMenuParent == null);

        this.updateMenusTree();
      });

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'description', header: 'Description' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  updateMenusTree(): void {
    this.listaNodeMenu = [];
    this.menuRoot = {
      'label': 'System Menu',
      'data': '0',
      'children': []
    };

    this.listaAdmMenu.forEach((itemMenu: AdmMenu) => {
      const m: TreeNode = {};
      m.label = itemMenu.description;
      m.data = itemMenu.id;

      if (itemMenu.idPage === null) {
        m.children = this.mountSubMenu(itemMenu, m);
        this.menuRoot.children.push(m);
      }
    });

    this.listaNodeMenu.push(this.menuRoot);
  }

  isSubMenu(menu: AdmMenu): boolean {
    return menu.idPage === null;
  }

  getAdmSubMenus(menuPai: AdmMenu): AdmMenu[] {
    return this.listaAdmMenu.filter(menu => menu.idMenuParent === menuPai.id);
  }

  mountSubMenu(menu: AdmMenu, pMenu: TreeNode): TreeNode[] {
    const lstSubMenu: TreeNode[] = [];

    this.getAdmSubMenus(menu).forEach((subMenu: AdmMenu) => {

      if (this.isSubMenu(subMenu)) {
        const m: TreeNode = {};
        m.data = subMenu;
        m.label = subMenu.description;
        m.children = this.mountSubMenu(subMenu, m);
      } else {
        const m: TreeNode = {};
        m.data = subMenu;
        m.label = subMenu.description;
        lstSubMenu.push(m);
      }
    });

    return lstSubMenu;
  }

  nodeSelect(event) {
    this.selectedAdmMenu = event.node.data;
  }

  onChangedTypeReport(typeReport: ItypeReport) {
    this.reportParamForm.reportType = typeReport.type;
  }

  onChangedForceDownload(forceDownload: boolean) {
    this.reportParamForm.forceDownload = forceDownload;
  }

  onExport() {
    this.admMenuService.report(this.reportParamForm).then(() => {
      this.messageService.add({ severity: 'info', summary: 'Menu Exported', detail: 'Menu Exported', life: 1000 });
    });
  }

  onInsert() {
    this.admMenu = {};
    this.submitted = false;
    this.admMenuDialog = true;
  }

  onEdit(admMenu: AdmMenu) {
    this.admMenu = { ...admMenu };
    this.admMenuDialog = true;
  }

  onDelete(admMenu: AdmMenu) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + admMenu.description + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.admMenuService.delete(admMenu.id).then(obj => {
          this.listaAdmMenu = this.listaAdmMenu.filter(val => val.id !== admMenu.id);
          this.admMenu = {};
          this.updateMenusTree();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Menu Deleted', life: 3000 });
        });
      }
    });
  }

  hideDialog() {
    this.admMenuDialog = false;
    this.submitted = false;
  }

  onSave() {
    this.submitted = true;

    if (this.admMenu.description.trim()) {
      if (this.admMenu.id) {
        this.admMenuService.update(this.admMenu).then((obj: AdmMenu) => {
          this.admMenu = obj;
          this.listaAdmMenu[this.admMenuService
            .findIndexById(this.listaAdmMenu, this.admMenu.id)] = this.admMenu;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Menu Updated', life: 3000 });
        });
      } else {
        this.admMenuService.insert(this.admMenu).then((obj: AdmMenu) => {
          this.admMenu = obj;
          this.listaAdmMenu.push(this.admMenu);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Menu Created', life: 3000 });
        });
      }

      this.listaAdmMenu = [...this.listaAdmMenu];
      this.admMenuDialog = false;
      this.admMenu = {};
      this.updateMenusTree();
    }

  }

}
