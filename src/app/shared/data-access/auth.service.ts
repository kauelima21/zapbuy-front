import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageEnum } from '../utils/constants';
import { ProfileResponse } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private localStorage = inject(LocalStorageService);

  signOut(): void {
    this.removeAuthToken();
    this.removeProfile();
    this.localStorage.removeItem(StorageEnum.storesStorageKey);
    this.router.navigate(['/auth/sign-in']);
  }

  getAuthToken() {
    return this.localStorage.getItem(StorageEnum.authStorageKey);
  }

  setAuthToken(token: string) {
    this.localStorage.setItem(StorageEnum.authStorageKey, token, false);
  }

  removeAuthToken() {
    this.localStorage.removeItem(StorageEnum.authStorageKey);
  }

  getProfile() {
    return this.localStorage.getItem(StorageEnum.profileStorageKey) as ProfileResponse;
  }

  setProfile(data: ProfileResponse) {
    this.localStorage.setItem(StorageEnum.profileStorageKey, data, true);
  }

  removeProfile() {
    this.localStorage.removeItem(StorageEnum.profileStorageKey);
  }
}
