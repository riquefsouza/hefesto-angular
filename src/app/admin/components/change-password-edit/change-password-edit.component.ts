import { cleanAdmUser } from './../../models/AdmUser';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdmUser } from '../../models/AdmUser';
import { ChangePasswordService } from '../../services/ChangePasswordService';

@Component({
  selector: 'app-change-password-edit',
  templateUrl: './change-password-edit.component.html',
  styleUrls: ['./change-password-edit.component.css'],
  providers: [ChangePasswordService, MessageService]
})
export class ChangePasswordEditComponent implements OnInit {

  admUser: AdmUser;

  submitted: boolean;

  constructor(
    private messageService: MessageService,
    private changePasswordService: ChangePasswordService) { }

  ngOnInit(): void {
    this.onClean();
  }

  onClean() {
    this.admUser = cleanAdmUser;
  }

  onSave() {
    this.submitted = true;

    if (this.admUser.newPassword !== this.admUser.confirmNewPassword) {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'New password and confirm password do not match!', life: 3000
      });
    } else {

      if (!this.changePasswordService.validatePassword(this.admUser.email, this.admUser.currentPassword)) {
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: 'The current password does not meet the security criteria.', life: 3000
        });
        return;
      }

      if (!this.changePasswordService.validatePassword(this.admUser.email, this.admUser.newPassword)) {
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: 'The new password does not meet the security criteria.', life: 3000
        });
        return;
      }

      if (this.changePasswordService.updatePassword(this.admUser.newPassword)) {
        this.messageService.add({
          severity: 'success', summary: 'Successful',
          detail: 'Password changed successfully!', life: 3000
        });
      }

    }

  }
}
