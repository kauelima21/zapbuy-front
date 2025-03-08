import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInRequest } from '@app/shared/interfaces/auth';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { SignInService } from './data-access/sign-in.service';
import { AuthService } from '@app/shared/data-access/auth.service';
import { Subscription } from 'rxjs';
import {AuthEnum} from '@app/shared/utils/constants';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  signInService = inject(SignInService);
  subscription = new Subscription();

  signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(AuthEnum.passwordPattern)]
    ],
  });

  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = 'Ops! Algo inesperado aconteceu. Tente novamente mais tarde.';

  handleSignIn({ email, password }: SignInRequest) {
    if (this.signInForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    this.subscription.add(
      this.signInService.signIn({ email, password }).subscribe({
        next: (data) => {
          this.authService.setAuthToken(data.access_token);
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          if (err.status === 401 && err.error.name === 'UnauthorizedError') {
            this.errorMessage = err.error.message;
          }
          this.isLoading.set(false);
          this.hasError.set(true);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
