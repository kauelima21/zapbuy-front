import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StoresService } from '../../../shared/data-access/stores.service';
import { AsyncPipe } from '@angular/common';
import { StoreComponent } from './ui/store/store.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';
import { ProfileService } from '@app/shared/data-access/profile.service';
import { Observable, Subscription } from 'rxjs';
import { StoreResponse } from '@app/shared/interfaces/stores';
import { NotFoundComponent } from '@app/shared/ui/not-found/not-found.component';

@Component({
  selector: 'app-stores',
  imports: [
    AsyncPipe,
    StoreComponent,
    ButtonComponent,
    LoadingComponent,
    NotFoundComponent
  ],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent implements OnInit, OnDestroy {
  private profileService = inject(ProfileService);
  private storesService = inject(StoresService);

  subscription = new Subscription();

  stores$: Observable<{ stores: StoreResponse[] }> | null = null;

  ngOnInit() {
    this.subscription.add(
      this.profileService.findProfile().subscribe(profile => {
        const ownerId = profile.user.user_id;

        return this.loadStores(ownerId);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadStores(ownerId: string) {
    this.stores$ = this.storesService.fetchStores();
  }
}
