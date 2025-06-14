import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Selecao } from 'src/app/models/selecao';
import { AuthService } from 'src/app/services/auth.service';
import { SelecaoService } from 'src/app/services/selecao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selecoes: Selecao[] = [];

  constructor(
    private selecaoService: SelecaoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selecaoService.getSelecoes().subscribe({
      next: (response) => {
        this.selecoes = response;
      },
      error: (err) => {
        console.error('Erro ao buscar seleções:', err);
        this.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToCreate(): void {
    this.router.navigate(['/selecoes/new']);
  }

  goToJogadores(): void {
    this.router.navigate(['/jogadores']);
  }

  editSelecao(id: string): void {
    this.router.navigate(['/selecoes/edit', id]);
  }

  deleteSelecao(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta seleção?')) {
      this.selecaoService.deleteSelecao(id).subscribe({
        next: () => {
          this.selecoes = this.selecoes.filter(s => s.id !== id);
        },
        error: (err) => alert(err.error.message)
      });
    }
  }
}