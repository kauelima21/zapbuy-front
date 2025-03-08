import {Component, inject, OnDestroy, signal} from '@angular/core';
import {ButtonComponent} from '@app/shared/ui/button/button.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ForgotPasswordService} from '@app/admin/auth/forgot-password/data-access/forgot-password.service';
import {AuthEnum} from '@app/shared/utils/constants';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  forgotPasswordService = inject(ForgotPasswordService);

  forgotPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    confirmation_code: ['', [Validators.pattern('^[0-9]{6}$')]],
    password: ['', [Validators.pattern(AuthEnum.passwordPattern)]],
  });

  formStep = signal(1);
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = 'Ops! Algo inesperado aconteceu. Tente novamente mais tarde.';

  subscription = new Subscription();

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleForgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    const formBody = this.forgotPasswordForm.getRawValue();

    if (this.formStep() == 1) {
      this.subscription.add(
        this.forgotPasswordService.getPasswordResetCode(formBody.email).subscribe({
          next: _ => {
            this.isLoading.set(false);
            this.formStep.set(2);
          },
          error: _ => {
            this.isLoading.set(false);
            this.hasError.set(true);
          }
        })
      );
    }

    if (this.formStep() == 2) {
      if (!formBody.confirmation_code || !formBody.password) {
        this.hasError.set(true);
        this.errorMessage = 'Um ou mais campos obrigatórios não foram preenchidos.'
        return;
      }

      this.subscription.add(
        this.forgotPasswordService.resetPassword(formBody).subscribe({
          next: _ => {
            this.isLoading.set(false);
            this.router.navigate(['/auth/sign-in']);
          },
          error: _ => {
            this.isLoading.set(false);
            this.hasError.set(true);
          }
        })
      );
    }
  }
}
