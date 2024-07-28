import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from "../../models/User";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setLastName(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lastName', name);
    }
  }
  getLastName() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('lastName');
    }
    return null;
  }
  setFirstName(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('firstName', name);
    }
  }
  getFirstName() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('firstName');
    }
    return null;
  }

  getEmail() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('email');
    }
    return null;
  }
  setEmail(email: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('email', email);
    }
  }
  setId(id: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('id', id.toString());
    }
  }
  getId() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('id');
    }
    return null;
  }
  getRoles(): string[] | null {
    if (isPlatformBrowser(this.platformId)) {
      const rolesString = localStorage.getItem('roles');
      return rolesString ? JSON.parse(rolesString) : null;
    }
    return null;
  }

  setRoles(roles: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }
  isUserLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('isUserLoggedIn')!);
    }
    return false;
  }

  setIsUserLoggedIn(b: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isUserLoggedIn', JSON.stringify(b));
    }
  }

  isAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('isAdmin')!);
    }
    return false;
  }

  setIsAdmin(b: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdmin', JSON.stringify(b));
    }
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
  removeUser() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear()
    }
  }



  setAccessToken(accessToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('accessToken', accessToken);
    }
  }

  getAccessToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  setRefreshToken(refreshToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  getRefreshToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }
}
