import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Selecao } from 'src/app/models/selecao';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { SelecaoService } from 'src/app/services/selecao.service';

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
    private router: Router
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
      // ATUALIZADO AQUI:
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
        alert('Avatar do usuário atualizado!');
        this.authService.saveUser(updatedUser);
        this.currentUser = updatedUser;
        this.buildUserAvatarUrl();
        this.selectedFile = null;
      },
      error: (err) => alert(err.error.message)
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
          alert(`Avatar da ${updatedSelecao.pais} atualizado!`);
          this.loadSelecoes(); 
        },
        error: (err) => alert(err.error.message)
      });
    }
  }

  logout(): void { this.authService.logout(); this.router.navigate(['/login']); }
  goToCreate(): void { this.router.navigate(['/selecoes/new']); }
  goToJogadores(): void { this.router.navigate(['/jogadores']); }
  editSelecao(id: string): void { this.router.navigate(['/selecoes/edit', id]); }
  deleteSelecao(id: string): void {
    if (confirm('Tem certeza?')) {
      this.selecaoService.deleteSelecao(id).subscribe({
        next: () => { this.selecoes = this.selecoes.filter(s => s.id !== id); },
        error: (err) => alert(err.error.message)
      });
    }
  }
}