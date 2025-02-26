import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpResponse, SignUpRequest } from '@app/shared/interfaces/auth';
import { BASE_URL } from '@app/shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private httpClient = inject(HttpClient);

  signUp(payload: SignUpRequest) {
    return this.httpClient.post<SignUpResponse>(`${BASE_URL}/auth/sign-up`, payload);
  }
}
