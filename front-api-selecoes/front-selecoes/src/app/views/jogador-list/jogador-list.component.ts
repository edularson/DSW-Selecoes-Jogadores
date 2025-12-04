import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Jogador } from 'src/app/models/jogador';
import { JogadorService } from 'src/app/services/jogador.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

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
  jogadores: Jogador[] = [];

  constructor(
    private jogadorService: JogadorService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
          : this.defaultAvatar
      }));
      this.dataSource.data = jogadoresComAvatar;
      this.jogadores = jogadoresComAvatar; 
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
          this.showMessage(`Avatar do ${updatedJogador.nome} atualizado!`);
          this.loadJogadores();
        },
        error: (err) => this.showMessage(err.error.message, true)
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este jogador?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jogadorService.deleteJogador(id).subscribe({
          next: () => {
            this.showMessage('Jogador deletado com sucesso!');
            this.loadJogadores();
          },
          error: (err) => this.showMessage(err.error.message, true)
        });
      }
    });
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