import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ChatService } from "../chat.service";


@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.css']
})

export class ChatInputComponent {
    
    constructor(public chatService: ChatService) {}

    onSendMessage(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.chatService.addChatMessage('ServiceDesk', form.value.content, new Date().toLocaleTimeString());
        form.resetForm();
    }

}
