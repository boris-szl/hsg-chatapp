import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { ChatMessage } from "src/app/shared/models/message";
import { ChatService } from "src/app/shared/services/chat.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnDestroy {

    @Input() nickname = '';

    // user$ = '1';
    // senderId = '1';

    users$ : any = ['Boris', 'Adam', 'Adrian'];
    // searchControl = new FormControl('');
    // messageControl = new FormControl('');
    // chatListControl = new FormControl('');
    // messages$ : any = [
    //     {
    //         'chatId' : 1,
    //         'senderId': 1,
    //         'text' : 'Hi',
    //         'sentDate' : '01/01/2022'
    //     },
    //     {
    //         'chatId' : 2,
    //         'senderId': 1,
    //         'text' : "Bye!",
    //         'sentDate' : '01/01/2022'
    //     },
    //     {
    //         'chatId' : 3,
    //         'senderId': 2,
    //         'text' : "Bye!",
    //         'sentDate' : '01/01/2022'
    //     }
    // ];

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
    
    public chatMessage = '';
    public errorMessage = '';

    private chatService$?: Subscription;

    constructor(private chatService: ChatService) {}

    ngOnDestroy(): void {
        this.chatService$?.unsubscribe();
      }

    ngOnInit(): void {
        this.getHistory();

        setInterval(() => {
            this.getHistory();
        }, 1000);
    }

    public messages: ChatMessage[] = [];

    private getHistory(): void {
        this.chatService$ = this.chatService.getHistory().subscribe({
            next: (response: ChatMessage[]) => {
                this.messages = response;
            },
            error: (error : Error) => {
                this.errorMessage = error.message;
            }
        });
    }

    sendMessage(message : string) : void {
        if (!message.trim()) {
            this.errorMessage = 'Please add text!';
            this.chatMessage = '';
            
            return;
        }
        
        if (!this.nickname) {
            this.errorMessage = 'Please add nickname!';

            return;
        }
        
        const messageToSend: ChatMessage = {
            message: message,
            nickname: this.nickname,
        };

        this.chatService$ = this.chatService.addToHistory(messageToSend).subscribe({
            next: (data: ChatMessage) => {
                console.log(data);
                this.chatMessage = '';
                this.errorMessage = '';
            },
            error: (error: Error) => {
                // never show server messages
                this.errorMessage = error.message;
                // log to log-server
            }
        });
    }

}