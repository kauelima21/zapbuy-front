import { Component, inject } from '@angular/core';
import { ProfileService } from '@app/shared/data-access/profile.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '@app/shared/ui/loading/loading.component';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    LoadingComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private profileService = inject(ProfileService);

  profile$ = this.profileService.findProfile();
}
