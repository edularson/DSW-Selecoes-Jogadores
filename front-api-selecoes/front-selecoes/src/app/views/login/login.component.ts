import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        this.authService.saveSession(response.token, response.user);
        this.showMessage('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.showMessage(err.error.message, true);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }
}