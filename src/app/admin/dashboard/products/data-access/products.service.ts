import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '@app/shared/utils/constants';
import { ProductResponse } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  fetchProducts(storeSlug: string) {
    return this.httpClient
      .get<{products: ProductResponse[]}>(`${BASE_URL}/admin/stores/${storeSlug}/products`);
  }
}
