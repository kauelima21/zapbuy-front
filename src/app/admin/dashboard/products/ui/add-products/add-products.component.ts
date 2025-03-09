import { Component, inject, input, output, signal } from '@angular/core';
import { ButtonComponent } from "@app/shared/ui/button/button.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-products',
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {
  isAddProductFormLoading = input.required<boolean>();

  productImage = signal<File | null>(null);
  uploadImageEvent = output<File | null>();
  formState = output<{state: string, data: any}>();

  private fb = inject(FormBuilder);

  addProductForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price_in_cents: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    category: ['', [Validators.required]],
  });

  handleUploadImageEvent() {
    this.uploadImageEvent.emit(this.productImage());
  }

  setProductImage({ target }: Event) {
    const element = target as HTMLInputElement;

    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      this.productImage.set(file);
      element.value = '';
    }
  }

  unsetProductImage() {
    this.productImage.set(null);

    this.handleUploadImageEvent();
  }

  handleFormStateEvent(state: string, data: any) {
    this.formState.emit({ state, data });
  }

  handleFormSubmit() {
    this.handleFormStateEvent('create', this.addProductForm.getRawValue());
    this.handleUploadImageEvent();
  }
}
