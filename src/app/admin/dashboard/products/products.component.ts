import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductsService } from './data-access/products.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';
import { Observable, Subscription } from 'rxjs';
import { ProductResponse } from './products';
import { StoresService } from '@app/shared/data-access/stores.service';
import { StoreResponse } from '@app/shared/interfaces/stores';
import { ButtonComponent } from '@app/shared/ui/button/button.component';

@Component({
  selector: 'app-products',
  imports: [
    AsyncPipe,
    LoadingComponent,
    ButtonComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  private storesService = inject(StoresService)

  products$: Observable<{products: ProductResponse[]}> | null = null;
  subscription = new Subscription();

  stores = signal<StoreResponse[]>([]);

  ngOnInit() {
    this.subscription.add(
      this.storesService.fetchStores()
        .subscribe(data => {
          if (data && data.stores.length == 0) return;

          this.stores.set(data.stores);

          const storeSlug = data.stores[0].store_slug

          return this.loadProducts(storeSlug);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshProductsListFromSelect({ target }: Event) {
    const storeSlug = (target as HTMLSelectElement).value;

    this.loadProducts(storeSlug);
  }

  loadProducts(storeSlug: string) {
    this.products$ = this.productsService.fetchProducts(storeSlug);
  }
}
