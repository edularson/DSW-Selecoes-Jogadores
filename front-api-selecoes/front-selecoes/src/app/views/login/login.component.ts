import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.authService.saveSession(response.token, response.user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}