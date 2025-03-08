import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, StorageEnum } from '@app/shared/utils/constants';
import { ProductResponse } from '../products';
import { StoreResponse } from '@app/shared/interfaces/stores';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '@app/shared/data-access/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  fetchProducts(storeSlug: string) {
    const productsStorage = this.localStorageService.getItem(StorageEnum.productsStorageKey) as {products: ProductResponse[]};

    if (productsStorage) {
      return of(productsStorage);
    }

    return this.httpClient
      .get<{ products: ProductResponse[] }>(`${BASE_URL}/admin/stores/${storeSlug}/products`)
      .pipe(
        tap(data => this.localStorageService.setItem(StorageEnum.productsStorageKey, data, true))
      );
  }

  getUploadUrl(storeSlug: string, productId: string, fileName: string, fileType: string) {
    return this.httpClient
      .post<{ url: string }>(
        `${BASE_URL}/admin/stores/${storeSlug}/products/${productId}/action/upload`,
        { file_type: fileType, file_name: fileName }
      );
  }

  uploadProductImage(uploadUrl: string, productImage: File) {
    return this.httpClient.put(uploadUrl, productImage, { headers: {'Content-Type': productImage.type} });
  }
}
