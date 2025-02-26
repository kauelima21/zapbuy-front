import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInRequest, SignInResponse } from '@app/shared/interfaces/auth';
import { BASE_URL } from '@app/shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private httpClient = inject(HttpClient);

  signIn(payload: SignInRequest) {
    return this.httpClient.post<SignInResponse>(`${BASE_URL}/auth/sign-in`, payload);
  }
}
