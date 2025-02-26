import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(key: string, value: any, stringify = true) {
    if (stringify) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string, parse = true): any {
    const response = localStorage.getItem(key);

    if (parse && response) {
      return JSON.parse(response);
    }

    return response;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
