import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Jogador } from 'src/app/models/jogador';
import { Selecao } from 'src/app/models/selecao';
import { JogadorService } from 'src/app/services/jogador.service';
import { SelecaoService } from 'src/app/services/selecao.service';

@Component({
  selector: 'app-jogador-form',
  templateUrl: './jogador-form.component.html',
  styleUrls: ['./jogador-form.component.css']
})
export class JogadorFormComponent implements OnInit {
  jogador: Jogador = new Jogador();
  selecoes: Selecao[] = [];
  isEditMode: boolean = false;
  pageTitle: string = 'Novo Jogador';
  avatarUrl: string | null = null;
  readonly apiBaseUrl = 'http://localhost:3333';
  readonly defaultAvatar = 'assets/default-avatar.png';
  selectedFile: File | null = null;

  constructor(
    private jogadorService: JogadorService,
    private selecaoService: SelecaoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selecaoService.getSelecoes().subscribe(response => {
      this.selecoes = response;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Jogador';
      this.jogadorService.getJogadorById(id).subscribe(response => {
        this.jogador = response;
        this.buildAvatarUrl();
      });
    } else {
      this.buildAvatarUrl();
    }
  }

  buildAvatarUrl(): void {
    if (this.jogador && this.jogador.avatar) {
      this.avatarUrl = `${this.apiBaseUrl}/files/${this.jogador.avatar}`;
    } else {
      this.avatarUrl = this.defaultAvatar;
    }
  }

  triggerFileInput(): void {
    document.getElementById('avatarUpload')?.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    if (this.isEditMode) {
      this.jogadorService.updateAvatar(this.jogador.id, this.selectedFile).subscribe({
        next: (updatedJogador) => {
          this.showMessage('Avatar atualizado!');
          this.jogador = updatedJogador;
          this.buildAvatarUrl();
          this.selectedFile = null;
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.jogadorService.updateJogador(this.jogador.id, this.jogador).subscribe({
        next: () => {
          this.showMessage('Jogador atualizado com sucesso!');
          this.router.navigate(['/jogadores']);
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    } else {
      this.jogadorService.createJogador(this.jogador).subscribe({
        next: (novoJogador) => {
          if (this.selectedFile) {
            this.jogadorService.updateAvatar(novoJogador.id, this.selectedFile).subscribe({
              next: () => {
                this.showMessage('Jogador cadastrado com sucesso!');
                this.router.navigate(['/jogadores']);
              }
            });
          } else {
            this.showMessage('Jogador cadastrado com sucesso!');
            this.router.navigate(['/jogadores']);
          }
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/jogadores']);
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