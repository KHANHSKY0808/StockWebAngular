import { Routes } from '@angular/router';
import { StockList } from './stock/stock-list/stock-list';
import { CreateStock } from './stock/create-stock/create-stock';
import { Login } from './stock/login/login';
import { Register } from './stock/register/register';
import { StockDetail } from './stock/stock-detail/stock-detail';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'create', component: CreateStock },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'stocks', component: StockList },
  { path: 'detail/:code', component: StockDetail, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
