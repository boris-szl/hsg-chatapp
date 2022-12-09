import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ChatService } from "../../../services/chat.service";


@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: ['./chat-input.component.css']
})

export class ChatInputComponent {
    
    
    constructor(public chatService: ChatService) {}

    @Input() username: string = "";
  
    changeUsername(data: string) {
      this.username = data;
    }

    onSendMessage(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.chatService.addChatMessage(this.username, form.value.content, new Date().toLocaleTimeString());
        form.resetForm();
    }

}
