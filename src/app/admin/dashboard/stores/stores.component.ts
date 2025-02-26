import { Component, inject } from '@angular/core';
import { StoresService } from '../../../shared/data-access/stores.service';
import { AsyncPipe } from '@angular/common';
import { StoreComponent } from './ui/store/store.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';

@Component({
  selector: 'app-stores',
  imports: [
    AsyncPipe,
    StoreComponent,
    ButtonComponent,
    LoadingComponent
  ],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {
  storesService = inject(StoresService);
  stores$ = this.storesService.fetchStores();
}
