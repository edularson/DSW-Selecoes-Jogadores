import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Selecao } from 'src/app/models/selecao';
import { SelecaoService } from 'src/app/services/selecao.service';

@Component({
  selector: 'app-selecao-form',
  templateUrl: './selecao-form.component.html',
  styleUrls: ['./selecao-form.component.css']
})
export class SelecaoFormComponent implements OnInit {
  selecao: Selecao = new Selecao();
  isEditMode: boolean = false;
  pageTitle: string = 'Nova Seleção';
  avatarUrl: string | null = null;
  readonly apiBaseUrl = 'http://localhost:3333';
  readonly defaultAvatar = 'assets/default-avatar.png';
  selectedFile: File | null = null;

  constructor(
    private selecaoService: SelecaoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Seleção';
      this.selecaoService.getSelecaoById(id).subscribe(response => {
        this.selecao = response;
        this.buildAvatarUrl();
      });
    } else {
      this.buildAvatarUrl();
    }
  }

  buildAvatarUrl(): void {
    if (this.selecao && this.selecao.avatar) {
      this.avatarUrl = `${this.apiBaseUrl}/files/${this.selecao.avatar}`;
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
      this.selecaoService.updateAvatar(this.selecao.id, this.selectedFile).subscribe({
        next: (updatedSelecao) => {
          this.showMessage('Avatar atualizado!');
          this.selecao = updatedSelecao;
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
      this.selecaoService.updateSelecao(this.selecao.id, this.selecao).subscribe({
        next: () => {
          this.showMessage('Seleção atualizada com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    } else {
      this.selecaoService.createSelecao(this.selecao).subscribe({
        next: (novaSelecao) => {
          if (this.selectedFile) {
            this.selecaoService.updateAvatar(novaSelecao.id, this.selectedFile).subscribe({
              next: () => {
                this.showMessage('Seleção cadastrada com sucesso!');
                this.router.navigate(['/home']);
              }
            });
          } else {
            this.showMessage('Seleção cadastrada com sucesso!');
            this.router.navigate(['/home']);
          }
        },
        error: (err) => this.showMessage(err.error.message, true)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
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