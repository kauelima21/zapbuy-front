import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '@app/shared/data-access/profile.service';
import { Subscription } from 'rxjs';
import { ProfileResponse } from '@app/shared/interfaces/auth';
import {AuthService} from '@app/shared/data-access/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  subscription = new Subscription();
  profile = signal<ProfileResponse | null>(null);

  ngOnInit(): void {
    this.subscription.add(
      this.profileService.findProfile().subscribe({
        next: (data) => {
          this.profile.set(data);
        },
        error: err => {
          console.error(err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut(): void {
    this.authService.signOut();
  }
}
