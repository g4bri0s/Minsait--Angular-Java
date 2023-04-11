import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  { path: 'clientes', component: ClientsComponent },
  { path: 'clientes/new', component: RegisterClientComponent },
  { path: 'clientes/edit/:cpf', component: EditClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
