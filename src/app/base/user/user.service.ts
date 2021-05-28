import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import jtw_decode from 'jwt-decode';
import { MenuItem } from 'primeng/api';
import { StorageService } from '../services/StorageService';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;
    private idProfiles: number[] = [];

    constructor(private tokenService: TokenService,
        private storageService: StorageService) {
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
        this.idProfiles = [];
        if (user.idProfiles.length > 0) {
            const vIdProfiles = user.idProfiles.split(',');
            vIdProfiles.forEach((id: string) => {
                this.idProfiles.push(parseInt(id, 0));
            });
        }
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
        this.storageService.removePersistedObj('menuItem');
        this.storageService.clearStorage();
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }

    getIdProfiles(): number[] {
        return this.idProfiles;
    }

    getMenuItems(): MenuItem[] {
        return this.storageService.getPersistedObj('menuItem') as MenuItem[];
    }

    setMenuItems(menuItems: MenuItem[]) {
        this.storageService.persistObj('menuItem', menuItems);
    }

}