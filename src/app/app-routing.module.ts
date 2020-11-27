import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './components/detail.component';
import { FormComponent } from './components/form.component';
import { MainComponent } from './components/main.component';

const ROUTES: Routes = [
  {path: '', component: MainComponent}, // Default route
  {path: 'form', component: FormComponent}, // Form route
  {path: 'detail', component: DetailComponent}, // Detail route
  {path: '**', redirectTo:'', pathMatch:'full'}, // Redirect route

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
