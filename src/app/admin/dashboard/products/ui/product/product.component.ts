import { Component, input } from '@angular/core';
import { ProductResponse } from '@app/admin/dashboard/products/products';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product = input.required<ProductResponse>();
}
