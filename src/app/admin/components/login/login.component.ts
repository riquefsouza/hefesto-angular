import { cleanAdmUser } from './../../models/AdmUser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdmUser } from '../../models/AdmUser';
import { LoginService } from '../../services/LoginService';
import { UserService } from 'src/app/base/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, MessageService, UserService]
})
export class LoginComponent implements OnInit {

  admUser: AdmUser;

  submitted: boolean;

  constructor(private messageService: MessageService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.onClean();
    this.userService.logout();
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
