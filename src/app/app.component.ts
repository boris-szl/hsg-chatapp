import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { Person } from './shared/models/person';
import { ChatService } from './shared/services/chat.service';
import { Subscription } from 'rxjs';
import { User } from './shared/models/users';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav;


  // @Output() nicknameCreate = new EventEmitter<string>();

  public nickname = '';
  public message = '';
  public errorMessage = '';
  public status? : number;

  private chatService$?: Subscription;

  constructor(
    private observer: BreakpointObserver,
    private chatService: ChatService,
    private _snackBar: MatSnackBar) {

  }

  ngOnDestroy(): void {
    this.chatService$?.unsubscribe();
  }
  
  sendNickname(nickname : string) : void {
    if (this.nickname.length > 0) {
      this.message = "Du hast schon einen Nicknamen";
    } 
    else {
      if (!nickname.trim()) {
        this.message = 'Bitte gib einen Nicknamen an!';
        this.nickname = '';

        return;
    }

    const nicknameToSend: User = {
      nickname: nickname.trim()
    };
    
    this.chatService$ = this.chatService.setNicknames(nicknameToSend).subscribe({
      next: (data: User) => {
        console.log(data);
        this.nickname = nickname;
        this.message = `Nickname: '${nickname}' erstellt`;
      },
      error: (error: Response) => {
        // never show server messages
        this.status = error.status;
        if (this.status === 409) {
          this.message = "Dieser Nickname existiert bereits!"
        }
        // this.errorMessage = error.message;
        // log to log-server
        }
      });
    }
    
    }

    openSnackBar(message: string) {
      this._snackBar.open(message);
    }

    displayErrorMessages() : void {
      if (this.status === 409) {
        this.errorMessage = "Nickname already exists"
      }
    }


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  

}