import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/models/jogador';
import { JogadorService } from 'src/app/services/jogador.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-jogador-list',
  templateUrl: './jogador-list.component.html',
  styleUrls: ['./jogador-list.component.css']
})
export class JogadorListComponent implements OnInit {

  readonly apiBaseUrl = 'http://localhost:3333';
  readonly defaultAvatar = 'assets/default-avatar.png';
  
  displayedColumns: string[] = ['avatar', 'nome', 'posicao', 'numero', 'clube', 'selecao', 'acoes'];
  
  dataSource = new MatTableDataSource<Jogador>();

  constructor(
    private jogadorService: JogadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJogadores();
  }

  loadJogadores(): void {
    this.jogadorService.getJogadores().subscribe(response => {
      const jogadoresComAvatar = response.map(jogador => ({
        ...jogador,
        avatarUrl: jogador.avatar
          ? `${this.apiBaseUrl}/files/${jogador.avatar}`
          : this.defaultAvatar // Usa a imagem local
      }));
      this.dataSource.data = jogadoresComAvatar;
    });
  }

  triggerJogadorFileInput(jogadorId: string): void {
    document.getElementById(`jogadorAvatarUpload-${jogadorId}`)?.click();
  }

  onJogadorFileSelected(event: any, jogador: Jogador): void {
    const file: File = event.target.files[0];
    if (file) {
      this.jogadorService.updateAvatar(jogador.id, file).subscribe({
        next: (updatedJogador) => {
          alert(`Avatar do ${updatedJogador.nome} atualizado!`);
          this.loadJogadores();
        },
        error: (err) => alert(err.error.message)
      });
    }
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
          this.loadJogadores(); // Recarrega a tabela
        },
        error: (err) => alert(err.error.message)
      });
    }
  }
}