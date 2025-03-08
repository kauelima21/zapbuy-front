import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordRequest} from '@app/shared/interfaces/auth';
import {BASE_URL} from '@app/shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private httpClient = inject(HttpClient);

  resetPassword(payload: ResetPasswordRequest) {
    return this.httpClient.post(`${BASE_URL}/auth/reset-password`, payload);
  }

  getPasswordResetCode(email: string) {
    return this.httpClient.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
  }
}
