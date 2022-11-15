import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string = "";
  matno: string = "19-606-656"
  
  onDataChange(data: string) {
    this.username = data;
  }
}