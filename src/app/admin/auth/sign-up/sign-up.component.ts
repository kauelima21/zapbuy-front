import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpRequest } from '@app/shared/interfaces/auth';
import { SignUpService } from './data-access/sign-up.service';
import { ButtonComponent } from '@app/shared/ui/button/button.component';
import { Subscription } from 'rxjs';
import {AuthEnum} from '@app/shared/utils/constants';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  signUpService = inject(SignUpService);
  subscription = new Subscription();

  signUpForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    given_name: ['', [Validators.required]],
    family_name: ['', [Validators.required]],
    password: ['', [
      Validators.required,
      Validators.pattern(AuthEnum.passwordPattern)]
    ],
    password_confirm: ['', [
      Validators.required,
      Validators.pattern(AuthEnum.passwordPattern)]
    ],
  });

  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = 'Ops! Algo inesperado aconteceu. Tente novamente mais tarde.';

  handleSignUp(payload: SignUpRequest) {
    if (this.signUpForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    this.subscription.add(
      this.signUpService.signUp(payload).subscribe({
        next: (data) => {
          this.isLoading.set(false);
          this.router.navigate(
            ['/auth/account-confirm'],
            { queryParams: { email: this.signUpForm.get('email')?.value } }
          );
        },
        error: err => {
          if (err.status === 400 && err.error.name === 'InvalidPasswordException') {
            this.errorMessage = 'A senha não segue o padrão';
          }
          if (err.status === 409 && err.error.name === 'ConflictError') {
            this.errorMessage = err.error.message;
          }
          this.isLoading.set(false);
          this.hasError.set(true);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
