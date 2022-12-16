import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
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
import { ChatArea } from "./components/home/chat-area/chat-area.component";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ProfileInputComponent,
        HomeComponent,
        ChatArea
    ],
    providers: [],
    bootstrap: [AppComponent],
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
        MatListModule,
    ]
})
export class AppModule { }
