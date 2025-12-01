import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
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
          alert('Avatar atualizado!');
          this.jogador = updatedJogador;
          this.buildAvatarUrl();
          this.selectedFile = null;
        },
        error: (err) => alert(err.error.message)
      });
    } 
    else {
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
          alert('Jogador atualizado!');
          this.router.navigate(['/jogadores']);
        },
        error: (err) => alert(err.error.message)
      });
    } else {
      this.jogadorService.createJogador(this.jogador).subscribe({
        next: (novoJogador) => {
          if (this.selectedFile) {
            this.jogadorService.updateAvatar(novoJogador.id, this.selectedFile).subscribe({
              next: () => {
                alert('Jogador cadastrado com sucesso!');
                this.router.navigate(['/jogadores']);
              }
            });
          } else {
            alert('Jogador cadastrado com sucesso!');
            this.router.navigate(['/jogadores']);
          }
        },
        error: (err) => alert(err.error.message)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/jogadores']);
  }
}