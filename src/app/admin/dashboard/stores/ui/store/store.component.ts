import { Component, input } from '@angular/core';
import { StoreResponse } from '../../../../../shared/interfaces/stores';
import { ButtonComponent } from '@app/shared/ui/button/button.component';

@Component({
  selector: 'app-store',
  imports: [
    ButtonComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  store = input.required<StoreResponse>();
}
