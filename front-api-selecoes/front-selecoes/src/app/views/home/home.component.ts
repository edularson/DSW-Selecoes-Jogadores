import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Selecao } from 'src/app/models/selecao';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SelecaoService } from 'src/app/services/selecao.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selecoes: Selecao[] = [];
  selectedFile: File | null = null;
  currentUser: User | null = null;
  userAvatarUrl: string | null = null;
  readonly apiBaseUrl = 'http://localhost:3333';
  readonly defaultAvatar = 'assets/default-avatar.png';

  constructor(
    private selecaoService: SelecaoService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.buildUserAvatarUrl();
    this.loadSelecoes();
  }

  loadSelecoes(): void {
    this.selecaoService.getSelecoes().subscribe({
      next: (response) => { 
        this.selecoes = response.map(selecao => ({
          ...selecao,
          avatarUrl: selecao.avatar 
            ? `${this.apiBaseUrl}/files/${selecao.avatar}` 
            : this.defaultAvatar
        }));
      },
      error: (err) => { this.logout(); }
    });
  }

  buildUserAvatarUrl(): void {
    if (this.currentUser && this.currentUser.avatar) {
      this.userAvatarUrl = `${this.apiBaseUrl}/files/${this.currentUser.avatar}`;
    } else {
      this.userAvatarUrl = this.defaultAvatar;
    }
  }

  triggerUserFileInput(): void {
    document.getElementById('userAvatarUpload')?.click();
  }

  onUserFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.onUserUpload();
    }
  }

  onUserUpload(): void {
    if (!this.selectedFile) return;
    this.authService.updateAvatar(this.selectedFile).subscribe({
      next: (updatedUser) => {
        this.showMessage('Avatar do usuário atualizado!');
        this.authService.saveUser(updatedUser);
        this.currentUser = updatedUser;
        this.buildUserAvatarUrl();
        this.selectedFile = null;
      },
      error: (err) => this.showMessage(err.error.message, true)
    });
  }

  triggerSelecaoFileInput(selecaoId: string): void {
    document.getElementById(`selecaoAvatarUpload-${selecaoId}`)?.click();
  }

  onSelecaoFileSelected(event: any, selecao: Selecao): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selecaoService.updateAvatar(selecao.id, file).subscribe({
        next: (updatedSelecao) => {
          this.showMessage(`Avatar da ${updatedSelecao.pais} atualizado!`);
          this.loadSelecoes(); 
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    }
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        message: 'Tem certeza que deseja sair do sistema?',
        confirmText: 'Sair'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.showMessage('Logout realizado com sucesso!');
      }
    });
  }

  goToCreate(): void { this.router.navigate(['/selecoes/new']); }
  goToJogadores(): void { this.router.navigate(['/jogadores']); }
  editSelecao(id: string): void { this.router.navigate(['/selecoes/edit', id]); }
  
  deleteSelecao(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar esta seleção?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selecaoService.deleteSelecao(id).subscribe({
          next: () => { 
            this.showMessage('Seleção deletada com sucesso!');
            this.selecoes = this.selecoes.filter(s => s.id !== id); 
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