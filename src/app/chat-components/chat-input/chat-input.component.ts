import { Component, EventEmitter, Output } from "@angular/core";


@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.css']
})

export class ChatInputComponent {
    
    enteredMessage = "";
    @Output() messageCreated = new EventEmitter();

    onSendMessage() {
        let message = {
            content: this.enteredMessage,
        };

        this.messageCreated.emit(message);
    }
}
