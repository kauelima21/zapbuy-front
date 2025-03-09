import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BASE_URL, StorageEnum } from '../utils/constants';
import { ProfileResponse } from '../interfaces/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private localStorage = inject(LocalStorageService);

  refreshAccessToken() {
    return this.httpClient.post<{ access_token: string }>(`${BASE_URL}/auth/refresh-token`, {
      user_token: this.getAuthToken(),
    }).pipe(
      tap(({ access_token }) => {
        this.setAuthToken(access_token);
      })
    );
  }

  signOut(): void {
    this.removeAuthToken();
    this.removeRefreshToken();
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

  getRefreshToken() {
    return this.localStorage.getItem(StorageEnum.refreshStorageKey);
  }

  setRefreshToken(token: string) {
    this.localStorage.setItem(StorageEnum.refreshStorageKey, token, false);
  }

  removeRefreshToken() {
    this.localStorage.removeItem(StorageEnum.refreshStorageKey);
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
