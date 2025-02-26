import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../utils/constants';
import { AuthService } from './auth.service';
import { ProfileResponse } from '../interfaces/auth';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  findProfile() {
    const localProfile = this.authService.getProfile();

    if (localProfile) {
      return of(localProfile);
    }

    return this.httpClient.get<ProfileResponse>(`${BASE_URL}/auth/profile`)
      .pipe(
        tap((data: ProfileResponse) => this.authService.setProfile(data))
      );
  }
}
