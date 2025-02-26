import { Route } from '@angular/router';
import { isAuthenticatedGuard } from '../../shared/guards/auth.guard';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'minhas-lojas',
        loadComponent: () => import('./stores/stores.component').then(m => m.StoresComponent),
      },
      {
        path: 'produtos',
        loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: 'meu-perfil',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: '',
        redirectTo: 'minhas-lojas',
        pathMatch: 'full',
      }
    ],
    canActivate: [isAuthenticatedGuard()],
  },
];
