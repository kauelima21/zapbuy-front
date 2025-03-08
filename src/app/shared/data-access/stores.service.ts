import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, StorageEnum } from '@app/shared/utils/constants';
import { AuthService } from '@app/shared/data-access/auth.service';
import { StoreResponse } from '../interfaces/stores';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '@app/shared/data-access/local-storage.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private httpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  fetchStores() {
    const storageStores = this.localStorageService.getItem(StorageEnum.storesStorageKey) as {stores: StoreResponse[]};

    if (storageStores) {
      return of(storageStores);
    }

    return this.httpClient
      .get<{stores: StoreResponse[]}>(`${BASE_URL}/admin/stores`)
      .pipe(
        tap(data => this.localStorageService.setItem(StorageEnum.storesStorageKey, data, true))
      );
  }
}
