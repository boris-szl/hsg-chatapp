import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: 'profile-input',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileInputComponent {

    username: string = '';
    @Output() dataChange = new EventEmitter();

    sendData(value: string) {
        this.dataChange.emit(value);
    }
}