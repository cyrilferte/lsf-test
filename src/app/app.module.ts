import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent, DialogOverviewExampleDialog} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent, SnackBarErrorComponent } from './form/form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatButtonModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatCardModule, MatRadioModule,MatTableModule, MatMenuModule,MatToolbarModule, MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LandingPageComponent,
    PageNotFoundComponent,
    SnackBarErrorComponent,
    LoginComponent,
    DialogOverviewExampleDialog
  ],
  entryComponents: [SnackBarErrorComponent, DialogOverviewExampleDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
