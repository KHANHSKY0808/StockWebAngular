import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user-service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private userService: UserService) {
    this._isLoggedIn$.next(this.userService.isLoggedIn());
  }

  refresh() {
    this._isLoggedIn$.next(this.userService.isLoggedIn());
  }

  logout() {
    this.userService.logout();
    this._isLoggedIn$.next(false);
  }
}
