import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpService } from './http-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  private endpoint = 'profile';
  private STORAGE_KEY = 'currentUser';

 
  // REGISTER
  
  register(user: User): Observable<User> {
    return this.post<User>(this.endpoint, user);
  }


  // LOGIN
 
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      'http://localhost:5223/api/profile/login',
      { username, password }
    );
  }

  
  // SET USER 
  
  private setCurrentUser(user: User) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      }
    } catch (e) {
      console.error('Lỗi lưu user:', e);
    }
  }


  // GET USER 

  getCurrentUser(): User | null {
    try {
      if (typeof window === 'undefined') return null;

      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Lỗi đọc user:', e);
      return null;
    }
  }

  
  // CHECK LOGIN (DÙNG CHO GUARD)

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  
  // LOGOUT
 
  logout() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    } catch (e) {
      console.error('Lỗi logout:', e);
    }
  }
}