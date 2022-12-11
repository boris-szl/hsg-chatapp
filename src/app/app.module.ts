import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatInputComponent } from './components/chat-components/chat-input/chat-input.component';
import { ChatOutputComponent } from './components/chat-components/chat-output/chat-output.component';
import { HomeComponent } from './components/home/home.component';

import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDividerModule } from '@angular/material/divider';

import { HttpClientModule } from '@angular/common/http';
import { ProfileInputComponent } from './components/profile-components/profile.component';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatListModule } from '@angular/material/list'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatInputComponent,
    ChatOutputComponent,
    ProfileInputComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
