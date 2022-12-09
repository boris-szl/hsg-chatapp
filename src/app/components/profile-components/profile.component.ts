import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'profile-input',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileInputComponent {

    // constructor(public userService: UserService) {}

    @Output() usernameInput = new EventEmitter<string>();

    sendData(value: string) {
        this.usernameInput.emit(value);
        console.log(value)
        
    }
}