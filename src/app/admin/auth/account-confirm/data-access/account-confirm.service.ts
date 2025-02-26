import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountConfirmRequest, SignInResponse } from '@app/shared/interfaces/auth';
import { BASE_URL } from '@app/shared/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AccountConfirmService {
  private httpClient = inject(HttpClient);

  accountConfirm(payload: AccountConfirmRequest) {
    return this.httpClient.post<SignInResponse>(`${BASE_URL}/auth/account-confirmation`, payload);
  }
}
