import { Component, input } from '@angular/core';
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
}
