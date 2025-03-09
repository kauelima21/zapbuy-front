import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductsService } from './data-access/products.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';
import { concatMap, Observable, Subscription } from 'rxjs';
import { ProductRequest, ProductResponse } from './products';
import { StoresService } from '@app/shared/data-access/stores.service';
import { StoreResponse } from '@app/shared/interfaces/stores';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { NotFoundComponent } from '@app/shared/ui/not-found/not-found.component';
import { TableComponent } from '@app/shared/ui/table/table.component';
import { ColDef, TableActionEvent } from '@app/shared/ui/table/table';
import { ModalComponent } from '@app/shared/ui/modal/modal.component';
import { ProductEditComponent } from '@app/admin/dashboard/products/ui/product-edit/product-edit.component';
import { AddProductsComponent } from '@app/admin/dashboard/products/ui/add-products/add-products.component';

@Component({
  selector: 'app-products',
  imports: [
    AsyncPipe,
    LoadingComponent,
    ButtonComponent,
    NotFoundComponent,
    TableComponent,
    ModalComponent,
    ProductEditComponent,
    AddProductsComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  private storesService = inject(StoresService)

  products$: Observable<{ products: ProductResponse[] }> | null = null;
  subscription = new Subscription();

  stores = signal<StoreResponse[]>([]);
  currentStoreSlug = signal<string>('')

  isProductEditModalOpen = signal(false);
  isAddProductModalOpen = signal(false);

  isFormLoading = signal(false);
  isImageUploading = signal(false);

  currentProduct = signal<ProductResponse | null>(null);
  productImage = signal<File | null>(null);
  productImageUploadUrl = signal('');

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

          this.currentStoreSlug.set(data.stores[0].store_slug);

          return this.loadProducts();
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshProductsListFromSelect({target}: Event) {
    this.currentStoreSlug.set((target as HTMLSelectElement).value);

    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.fetchProducts(this.currentStoreSlug());
  }

  openAddProductModal() {
    this.isAddProductModalOpen.set(true);
  }

  handleCellAction(event: TableActionEvent) {
    if (event.eventName === 'edit') {
      this.isProductEditModalOpen.set(true);
      this.currentProduct.set(event.item as ProductResponse);
    }
  }

  handleProductImageUpload(productImage: File | null, isCreationAction = false) {
    this.productImage.set(productImage);

    if (!productImage) {
      this.productImageUploadUrl.set('');
      return;
    }

    if (isCreationAction) return;

    this.isImageUploading.set(true);

    this.subscription.add(
      this.productsService.getUploadUrl(
        this.currentStoreSlug(),
        this.currentProduct()?.product_id ?? '',
        productImage
      ).subscribe(({ url }) => {
          this.productImageUploadUrl.set(url);
          this.isImageUploading.set(false);
      })
    );
  }

  handleModalState(event: {state: string, data: any}) {
    if (event.state === 'closed') {
      this.isProductEditModalOpen.set(false);
      this.isAddProductModalOpen.set(false);
      this.productImageUploadUrl.set('');
    }

    if (event.state === 'edit') {
      this.updateProductInfo();
    }

    if (event.state === 'create') {
      this.createProduct(event.data as ProductRequest);
    }
  }

  createProduct(product: ProductRequest) {
    this.isFormLoading.set(true);

    this.subscription.add(
      this.productsService.saveProduct(product, this.currentStoreSlug())
        .pipe(
          concatMap(
            ({ product_id }) => this.productsService
              .getUploadUrl(this.currentStoreSlug(), product_id, this.productImage())
          ),
          concatMap(
            ({ url }) => this.productsService
              .uploadProductImage(url, this.productImage())
          )
        ).subscribe({
            next: data => {
              this.isFormLoading.set(false);
              this.isAddProductModalOpen.set(false);
              this.loadProducts();
            }
          })
    );
  }

  updateProductInfo() {
    // update api
    // upload image
  }
}
