import { Injectable } from '@angular/core';
import { StorageData } from '@app/shared/interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem<T>(key: string, value: any, expires = false) {
    const data: StorageData<T> = {
      value,
    }

    if (expires) {
      data.expirationTime = Date.now() + (30 * 60 * 1000);
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): any {
    let response = localStorage.getItem(key);

    if (!response) {
      return null;
    }

    const parsedResponse: StorageData<T> = JSON.parse(response);
    if (parsedResponse) {
      if (parsedResponse.expirationTime && Date.now() > parsedResponse.expirationTime) {
        this.removeItem(key);
      }

      return parsedResponse.value;
    }

    return null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
