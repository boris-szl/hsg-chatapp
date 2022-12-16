import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { Person } from './shared/models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav;


  @Output() nicknameCreate = new EventEmitter<string>();
  
  nickname = '';
  public message = '';
  public sendToChild = '';

  constructor(private observer: BreakpointObserver) {

  }

  public createNickname(nickname: string): void {
    Person.Nickname = nickname;

    this.message = `nickname: '${Person.Nickname}' created`;
    this.nicknameCreate.emit(Person.Nickname);
    this.nickname = Person.Nickname; 
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