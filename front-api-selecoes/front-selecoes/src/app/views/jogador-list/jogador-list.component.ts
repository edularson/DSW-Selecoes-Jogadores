import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/models/jogador';
import { JogadorService } from 'src/app/services/jogador.service';

@Component({
  selector: 'app-jogador-list',
  templateUrl: './jogador-list.component.html',
  styleUrls: ['./jogador-list.component.css']
})
export class JogadorListComponent implements OnInit {

  jogadores: Jogador[] = [];

  constructor(
    private jogadorService: JogadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jogadorService.getJogadores().subscribe(response => {
      this.jogadores = response;
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToCreate(): void {
    this.router.navigate(['/jogadores/new']);
  }

  editJogador(id: string): void {
    this.router.navigate(['/jogadores/edit', id]);
  }

  deleteJogador(id: string): void {
    if (confirm('Tem certeza que deseja deletar este jogador?')) {
      this.jogadorService.deleteJogador(id).subscribe({
        next: () => {
          alert('Jogador deletado com sucesso!');
          this.jogadores = this.jogadores.filter(j => j.id !== id);
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    }
  }
}