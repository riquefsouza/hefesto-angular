import { MenuItemDTO } from './../../models/MenuItemDTO';
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
    this.menuItems = this.userService.getMenuItems();

    if (this.menuItems) {
      this.menuItems.push({ label: 'Sair', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); } });
    }

/*
    this.menuItems = [
      {
        label: 'Settings',
        items: [
          { label: 'Parameter Category', routerLink: '/admin/admParameterCategory' },
          { label: 'Parameter', routerLink: '/admin/admParameter' },
          { label: 'Profile', routerLink: '/admin/admProfile' },
          { label: 'Page', routerLink: '/admin/admPage' },
          { label: 'Menu', routerLink: '/admin/admMenu' },
          { label: 'User', routerLink: '/admin/admUser' },
          { label: 'Change Password', routerLink: '/admin/changePasswordEdit' },
          { label: 'Sair', command: () => { this.logout(); } }
        ]
      }
    ];
*/
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
