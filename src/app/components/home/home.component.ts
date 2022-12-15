import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ChatService } from "../../services/chat.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    user$ = '1';
    senderId = '1';

    users$ : any = ['Boris', 'Adam', 'Adrian'];
    searchControl = new FormControl('');
    messageControl = new FormControl('');
    chatListControl = new FormControl('');
    messages$ : any = [
        {
            'chatId' : 1,
            'senderId': 1,
            'text' : 'Hi',
            'sentDate' : '01/01/2022'
        },
        {
            'chatId' : 2,
            'senderId': 1,
            'text' : "Bye!",
            'sentDate' : '01/01/2022'
        },
        {
            'chatId' : 3,
            'senderId': 2,
            'text' : "Bye!",
            'sentDate' : '01/01/2022'
        }
    ];

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

    constructor(public chatService: ChatService) {}
    
    sendMessage() {
        // const message = this.messageControl.value;
        // const selectedChatId = this.chatListControl.value[0];
        // if (message && selectedChatId) {
        //     this.chatService
        //       .addChatMessage(selectedChatId, message)
        //       .subscribe(() => {
        //         this.scrollToBottom();
        //       });
        //     this.messageControl.setValue('');
          }
}