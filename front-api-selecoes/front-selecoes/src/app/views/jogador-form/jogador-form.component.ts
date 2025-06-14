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

  constructor(
    private jogadorService: JogadorService,
    private selecaoService: SelecaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
      });
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.jogadorService.updateJogador(this.jogador.id, this.jogador).subscribe({
        next: () => {
          alert('Jogador atualizado com sucesso!');
          this.router.navigate(['/jogadores']);
        },
        error: (err) => alert(err.error.message)
      });
    } else {
      this.jogadorService.createJogador(this.jogador).subscribe({
        next: () => {
          alert('Jogador cadastrado com sucesso!');
          this.router.navigate(['/jogadores']);
        },
        error: (err) => alert(err.error.message)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/jogadores']);
  }
}