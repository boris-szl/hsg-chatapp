import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    
    user$ = "Current User";
    users$ : any = ['Boris', 'Adam', 'Adrian'];
    searchControl = new FormControl('');

    myChats$ : any = [
            {
            'user': 'Boris'
            },
            {
            'user': 'Adam'
            },
            {
            'user': 'Adrian'
            }
    ];
     


    ngOnInit(): void {

    }
}