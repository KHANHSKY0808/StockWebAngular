import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = new User('', '', '');
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(form : NgForm) {
    if (!form.valid) {
      this.message = 'Form invalid!';
      return;
    }

    this.userService.register(this.user).subscribe({
      next: () => {
        this.message = 'Đăng ký thành công!';
        form.resetForm();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.message = 'Đăng ký thất bại!';
      }
    });
  }
}
