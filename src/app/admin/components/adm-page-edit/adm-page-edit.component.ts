import { cleanAdmPage } from './../../models/AdmPage';
import { AdmProfile } from './../../models/AdmProfile';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmPage } from '../../models/AdmPage';
import { AdmPageService } from '../../services/AdmPageService';
import { AdmProfileService } from '../../services/AdmProfileService';

@Component({
  selector: 'app-adm-page-edit',
  templateUrl: './adm-page-edit.component.html',
  styleUrls: ['./adm-page-edit.component.css'],
  providers: [AdmPageService, MessageService, AdmProfileService]
})
export class AdmPageEditComponent implements OnInit {

  admPage: AdmPage;

  submitted: boolean;

  listaAdmPage: AdmPage[];

  sourceProfiles: AdmProfile[];
  targetProfiles: AdmProfile[];

  constructor(private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private admPageService: AdmPageService,
    private admProfileService: AdmProfileService) {}

  ngOnInit(): void {
    // this.admPage = this.storageService.getStorage();
    this.admPage = this.storageService.getPersistedObj('admPage') as AdmPage;

    this.admPageService
    .findAll()
    .then(data => this.listaAdmPage = data);

    this.loadAdmProfiles();
  }

  private loadAdmProfiles(): void {
    this.targetProfiles = [];
    if (this.admPage.id != null) {
      this.admProfileService.findProfilesByPage(this.admPage).then(data => {
        this.targetProfiles = data;

        this.admProfileService.findAll().then(profiles => {
          this.sourceProfiles = profiles.filter(profile => !this.targetProfiles.find(target => target.id === profile.id));
        });

      });
    }
  }

  onClean() {
    this.admPage = cleanAdmPage;
  }

  onSave() {
    this.submitted = true;

    if (this.admPage.description.trim()) {
        if (this.admPage.id) {
            this.listaAdmPage[
              this.admPageService.findIndexById(this.listaAdmPage, this.admPage.id)] = this.admPage;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Page Updated', life: 3000 });
        } else {
            this.admPage.id = this.listaAdmPage.length + 1;
            this.listaAdmPage.push(this.admPage);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Page Created', life: 3000 });
        }

        this.listaAdmPage = [...this.listaAdmPage];
        this.admPage = {};
        this.router.navigate(['/admPage']);
    }
  }

}
