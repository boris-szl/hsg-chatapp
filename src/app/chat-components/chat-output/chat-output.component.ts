import { Component, Input } from "@angular/core";



@Component({
    selector: 'app-chat-output',
    templateUrl: './chat-output.component.html',
    styleUrls: ['./chat-output.component.css']
})

export class ChatOutputComponent {
    @Input() messages = Array();
}