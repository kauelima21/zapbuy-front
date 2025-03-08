import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductsService } from './data-access/products.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';
import { Observable, Subscription } from 'rxjs';
import { ProductResponse } from './products';
import { StoresService } from '@app/shared/data-access/stores.service';
import { StoreResponse } from '@app/shared/interfaces/stores';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { NotFoundComponent } from '@app/shared/ui/not-found/not-found.component';
import { TableComponent } from '@app/shared/ui/table/table.component';
import { ColDef, TableActionEvent } from '@app/shared/ui/table/table';
import { ModalComponent } from '@app/shared/ui/modal/modal.component';
import { ProductEditComponent } from '@app/admin/dashboard/products/ui/product-edit/product-edit.component';

@Component({
  selector: 'app-products',
  imports: [
    AsyncPipe,
    LoadingComponent,
    ButtonComponent,
    NotFoundComponent,
    TableComponent,
    ModalComponent,
    ProductEditComponent
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

  isProductEditModalOpen = signal(false);

  currentProduct = signal<ProductResponse | null>(null);

  tableColumnDefs: ColDef[] = [
    {
      align: 'left',
      field: 'product_id',
      header: 'ID',
      suppress: true,
      suppressConfig: {
        length: 8,
        copy: true,
      }
    },
    {
      field: 'name',
      header: 'Produto',
    },
    {
      field: 'price_in_cents',
      header: 'Preço',
      currency: true,
    },
    {
      field: 'status',
      header: 'Status',
      iconConfig: [
        {
          value: 'active',
          icon: 'ph-fill ph-check-circle',
          label: 'ativo',
          color: '#36BA9B',
        },
        {
          value: 'inactive',
          icon: 'ph-fill ph-x',
          label: 'inativo',
          color: '#D94352',
        },
      ]
    },
    {
      header: 'Ações',
      field: '',
      actionsConfig: [
        {
          eventName: 'edit',
          icon: 'ph ph-pencil-simple-line',
          type: 'primary'
        }
      ]
    }
  ];

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

  handleCellAction(event: TableActionEvent) {
    if (event.eventName === 'edit') {
      this.isProductEditModalOpen.set(true);
      this.currentProduct.set(event.item as ProductResponse);
    }
  }

  handleModalState(event: string) {
    if (event === 'closed') {
      this.isProductEditModalOpen.set(false);
    }
  }
}
