import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../data-access/auth.service';
import { catchError, throwError } from 'rxjs';
import { BASE_URL } from '@app/shared/utils/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken();

  const reqWithHeaders = req.clone({
    setHeaders: {
      Authorization: authToken,
    }
  });

  let finalReq = req;

  if (req.url.includes(BASE_URL) && (!req.url.includes('/auth') || req.url.endsWith('/auth/profile'))) {
    finalReq = reqWithHeaders
  }

  return next(finalReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!req.url.includes('/auth/sign-in') && err.status === 401) {
        authService.signOut();
      }

      return throwError(() => err);
    })
  );
};
