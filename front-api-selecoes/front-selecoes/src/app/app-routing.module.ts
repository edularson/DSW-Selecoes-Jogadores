import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SelecaoFormComponent } from './views/selecao-form/selecao-form.component';
import { JogadorListComponent } from './views/jogador-list/jogador-list.component';
import { JogadorFormComponent } from './views/jogador-form/jogador-form.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'selecoes/new', component: SelecaoFormComponent, canActivate: [AuthGuard] },
  { path: 'selecoes/edit/:id', component: SelecaoFormComponent, canActivate: [AuthGuard] },
  { path: 'jogadores', component: JogadorListComponent, canActivate: [AuthGuard] },
  { path: 'jogadores/new', component: JogadorFormComponent, canActivate: [AuthGuard] },
  { path: 'jogadores/edit/:id', component: JogadorFormComponent, canActivate: [AuthGuard] }, // ROTA FINAL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }