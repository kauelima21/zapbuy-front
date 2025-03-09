import { Component, input, output, signal } from '@angular/core';
import { ProductResponse } from '@app/admin/dashboard/products/products';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  product = input.required<ProductResponse | null>();
  isProductEditFormLoading = input.required<boolean>();
  isImageUploading = input.required<boolean>();

  productImage = signal<File | null>(null);
  uploadImageEvent = output<File | null>();
  formState = output<{state: string, data: any}>();

  handleUploadImageEvent() {
    this.uploadImageEvent.emit(this.productImage());
  }

  setProductImage({ target }: Event) {
    const element = target as HTMLInputElement;

    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.productImage.set(file);

      this.handleUploadImageEvent();
    }
  }

  unsetProductImage() {
    this.productImage.set(null);

    this.handleUploadImageEvent();
  }

  handleFormStateEvent(state: string) {
    this.formState.emit({ state, data: {} });
  }
}
