import { cleanAdmUser } from './../../models/AdmUser';
import { AdmProfile } from './../../models/AdmProfile';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmUser } from '../../models/AdmUser';
import { AdmUserService } from '../../services/AdmUserService';
import { AdmProfileService } from '../../services/AdmProfileService';

@Component({
  selector: 'app-adm-user-edit',
  templateUrl: './adm-user-edit.component.html',
  styleUrls: ['./adm-user-edit.component.css'],
  providers: [AdmUserService, MessageService, AdmProfileService]
})
export class AdmUserEditComponent implements OnInit {

  admUser: AdmUser;

  submitted: boolean;

  listaAdmUser: AdmUser[];

  sourceProfiles: AdmProfile[];
  targetProfiles: AdmProfile[];

  constructor(private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private admUserService: AdmUserService,
    private admProfileService: AdmProfileService) {}

  ngOnInit(): void {
    // this.admUser = this.storageService.getStorage();
    this.admUser = this.storageService.getPersistedObj('admUser') as AdmUser;

    this.admUserService
    .findAll()
    .then(data => this.listaAdmUser = data);

    this.loadAdmProfiles();
  }

  private loadAdmProfiles(): void {
    this.targetProfiles = [];
    if (this.admUser.id != null) {
      this.admProfileService.findProfilesByUser(this.admUser).then(data => {
        this.targetProfiles = data;

        this.admProfileService.findAll().then(profiles => {
          this.sourceProfiles = profiles.filter(profile => !this.targetProfiles.find(target => target.id === profile.id));
        });

      });
    }
  }

  onClean() {
    this.admUser = cleanAdmUser;
  }

  onSave() {
    this.submitted = true;

    if (this.admUser.name.trim()) {
        if (this.admUser.id) {
            this.listaAdmUser[
              this.admUserService.findIndexById(this.listaAdmUser, this.admUser.id)] = this.admUser;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        } else {
            this.admUser.id = this.listaAdmUser.length + 1;
            this.listaAdmUser.push(this.admUser);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        }

        this.listaAdmUser = [...this.listaAdmUser];
        this.admUser = {};
        this.router.navigate(['/admUser']);
    }
  }

}
