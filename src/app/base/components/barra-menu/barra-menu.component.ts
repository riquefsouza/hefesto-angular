import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-barra-menu',
  templateUrl: './barra-menu.component.html',
  styleUrls: ['./barra-menu.component.css']
})
export class BarraMenuComponent implements OnInit {

  logged: boolean;

  menuItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.logged = true;

    this.menuItems = [
        {
            label: 'Settings',
            items: [
                {label: 'Parameter Category', routerLink: '/admParameterCategory'},
                {label: 'Parameter', routerLink: '/admParameter'},
                {label: 'Profile', routerLink: '/admProfile'},
                {label: 'Page', routerLink: '/admPage'},
                {label: 'Menu', routerLink: '/admMenu'},
                {label: 'User', routerLink: '/admUser'},
                {label: 'Change Password', routerLink: '/changePasswordEdit'},
                {label: 'Sair', routerLink: '/'}
            ]
        }
    ];
  }

}
