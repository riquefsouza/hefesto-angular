import { AdmProfile, cleanAdmProfile } from './../../models/AdmProfile';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/base/services/StorageService';
import { AdmProfileService } from '../../services/AdmProfileService';
import { AdmUser } from '../../models/AdmUser';
import { AdmPage } from '../../models/AdmPage';
import { AdmPageService } from '../../services/AdmPageService';
import { AdmUserService } from '../../services/AdmUserService';

@Component({
  selector: 'app-adm-profile-edit',
  templateUrl: './adm-profile-edit.component.html',
  styleUrls: ['./adm-profile-edit.component.css'],
  providers: [AdmProfileService, MessageService, AdmUserService, AdmPageService]
})
export class AdmProfileEditComponent implements OnInit {

  admProfile: AdmProfile;

  submitted: boolean;

  listaAdmProfile: AdmProfile[];

  sourceUsers: AdmUser[];
  targetUsers: AdmUser[];

  sourcePages: AdmPage[];
  targetPages: AdmPage[];

  constructor(private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private admProfileService: AdmProfileService,
    private admUserService: AdmUserService,
    private admPageService: AdmPageService) {}

  ngOnInit(): void {
    // this.admProfile = this.storageService.getStorage();
    this.admProfile = this.storageService.getPersistedObj('admProfile') as AdmProfile;

    this.admProfileService
    .findAll()
    .then(data => this.listaAdmProfile = data);

    this.loadAdmUsers();
    this.loadAdmPages();
  }

  private loadAdmUsers(): void {
    this.targetUsers = [];
    if (this.admProfile.id != null) {
      // this.admUserService.findUsersByProfile(this.admProfile).then(data => this.targetUsers = data);
      this.targetUsers = [...this.admProfile.admUsers];
    }
    this.admUserService.findAll().then(users => {
      this.sourceUsers = users.filter(user => !this.targetUsers.find(target => target.id === user.id));
    });
  }

  private loadAdmPages(): void {
    this.targetPages = [];
    if (this.admProfile.id != null) {
      // this.admPageService.findPagesByProfile(this.admProfile).then(data => this.targetPages = data);
      this.targetPages = [...this.admProfile.admPages];
    }
    this.admPageService.findAll().then(pages => {
      this.sourcePages = pages.filter(pager => !this.targetPages.find(target => target.id === pager.id));
    });
  }

  onClean() {
    this.admProfile = cleanAdmProfile;
  }

  onSave() {
    this.submitted = true;

    if (this.admProfile.description.trim()) {
        if (this.admProfile.id) {
          this.admProfileService.update(this.admProfile).then((obj: AdmProfile) => {
            this.admProfile = obj;

            this.listaAdmProfile[
              this.admProfileService.findIndexById(this.listaAdmProfile, this.admProfile.id)] = this.admProfile;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 3000 });
          });
        } else {
          this.admProfileService.insert(this.admProfile).then((obj: AdmProfile) => {
            this.admProfile = obj;

            this.listaAdmProfile.push(this.admProfile);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Created', life: 3000 });
          });
        }

        this.listaAdmProfile = [...this.listaAdmProfile];
        this.admProfile = {};
        this.router.navigate(['/admin/admProfile']);
    }
  }

}
