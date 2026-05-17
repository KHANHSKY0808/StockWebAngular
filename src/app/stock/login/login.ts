import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { UserStore } from '../../services/user-store';

@Component({
  selector: 'app-login',
  imports: [FormsModule,JsonPipe,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  message = '';

  constructor(private userService: UserService, private router: Router, private userStore: UserStore) {}

  Login_event( form : NgForm): void {
    const { username, password } = form.value;

    this.userService.login(username, password).subscribe(user => {
      if (user) {
        this.message = 'Đăng nhập thành công!';
        console.log('User:', user);
        this.userStore.refresh();
        this.router.navigate(['stocks'], { queryParams: { page: 1 } });
      } else {
        this.message = 'Sai tài khoản hoặc mật khẩu!';
      }
    });
  }
}
