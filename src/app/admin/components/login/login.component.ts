import { cleanAdmUser } from './../../models/AdmUser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdmUser } from '../../models/AdmUser';
import { LoginService } from '../../services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, MessageService]
})
export class LoginComponent implements OnInit {

  admUser: AdmUser;

  submitted: boolean;

  constructor(private messageService: MessageService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.onClean();
  }

  onClean() {
    this.admUser = cleanAdmUser;
  }

  login() {
    this.submitted = true;

    this.loginService.login(this.admUser).then((islogged: boolean) => {
      if (islogged) {
        this.router.navigate(['home']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'login not allowed!', life: 3000 });
      }
    })
    .catch(erro => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'login not allowed!', life: 3000 });
    });

  }
}
