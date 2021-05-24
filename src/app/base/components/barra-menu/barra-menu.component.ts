import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {

  menuItems: MenuItem[];

  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router) {

    this.user$ = userService.getUser();
  }

  ngOnInit(): void {

    this.menuItems = [
      {
        label: 'Settings',
        items: [
          { label: 'Parameter Category', routerLink: '/admParameterCategory' },
          { label: 'Parameter', routerLink: '/admParameter' },
          { label: 'Profile', routerLink: '/admProfile' },
          { label: 'Page', routerLink: '/admPage' },
          { label: 'Menu', routerLink: '/admMenu' },
          { label: 'User', routerLink: '/admUser' },
          { label: 'Change Password', routerLink: '/changePasswordEdit' },
          { label: 'Sair', command: () => { this.logout(); } }
        ]
      }
    ];
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
