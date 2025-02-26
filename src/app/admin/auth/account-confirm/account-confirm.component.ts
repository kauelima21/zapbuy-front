import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ButtonComponent } from "@app/shared/ui/button/button.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountConfirmService } from './data-access/account-confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-confirm',
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './account-confirm.component.html',
  styleUrl: './account-confirm.component.scss'
})
export class AccountConfirmComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);

  accountConfirmService = inject(AccountConfirmService);

  accountConfirmForm = this.fb.nonNullable.group({
    confirmation_code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
  });

  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = 'Ops! Algo inesperado aconteceu. Tente novamente mais tarde.';

  userEmail = '';

  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activateRoute.queryParams.subscribe(params => {
        this.userEmail = params['email'];
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAccountConfirm() {
    if (this.accountConfirmForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    const confirmCode = this.accountConfirmForm.controls['confirmation_code'].value;

    this.subscription.add(
      this.accountConfirmService.accountConfirm({
        confirmation_code: confirmCode,
        email: this.userEmail,
      }).subscribe({
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
