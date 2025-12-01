import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.createUser(this.user).subscribe({
      next: (newUser) => {
        alert('Conta criada com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao criar conta: ' + err.error.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}