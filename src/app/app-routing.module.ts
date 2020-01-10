import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from './form/form.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '',
    component: LandingPageComponent
  }
  ,
  {
    path: 'form',
    component: FormComponent
  },

  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
