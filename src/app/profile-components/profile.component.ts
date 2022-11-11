import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared/shared.Service";

@Component({
    selector: 'profile-input',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileInputComponent implements OnInit {

    constructor(private shared: SharedService) {}
    username='';
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.shared.setMessage(this.username);
    }

    getValue(value: string) {
        console.log(value);
        this.username = value;
    }

}