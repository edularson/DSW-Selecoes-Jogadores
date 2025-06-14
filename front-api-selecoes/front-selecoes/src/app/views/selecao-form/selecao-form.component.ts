import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private selecaoService: SelecaoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Seleção';
      this.selecaoService.getSelecaoById(id).subscribe(response => {
        this.selecao = response;
      });
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.selecaoService.updateSelecao(this.selecao.id, this.selecao).subscribe({
        next: () => {
          alert('Seleção atualizada com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => alert(err.error.message)
      });
    } else {
      this.selecaoService.createSelecao(this.selecao).subscribe({
        next: () => {
          alert('Seleção cadastrada com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (err) => alert(err.error.message)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}