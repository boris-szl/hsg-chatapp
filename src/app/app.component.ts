import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hsg-chatapp';

  enteredMessages = Array();
  onMessageEntered(message: any) {
    this.enteredMessages.push(message);
  }
}
