import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { response } from "express";
import { Subscription } from "rxjs";
import { ChatMessage } from "src/app/shared/models/message";
import { User } from "src/app/shared/models/users";
import { ChatService } from "src/app/shared/services/chat.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnDestroy {

    @Input() nickname = '';

    users$ : any = ['Boris', 'Adam', 'Adrian'];

    public chatMessage = '';
    public errorMessage = '';

    private chatService$?: Subscription;

    constructor(private chatService: ChatService) {}

    ngOnDestroy(): void {
        this.chatService$?.unsubscribe();
      }

    ngOnInit(): void {
        this.getNicknames();

        setInterval(() => {
            this.getNicknames();
        }, 1000);
    }

    public messages: ChatMessage[] = [];
    public nicknames$: User[] = [];

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

    private getNicknames(): void {
        this.chatService$ = this.chatService.getNicknames().subscribe({
            next: (response: User[]) => {
                this.nicknames$ = response;
            },
            error: (error: Error) => {
                this.errorMessage = error.message;
            }
        })
    }

    sendMessage(message : string) : void {
        if (!message.trim()) {
            this.errorMessage = 'Bitte füge einen Text hinzu!';
            this.chatMessage = '';
            return;
        }
        
        if (!this.nickname) {
            this.errorMessage = 'Bitte füge einen Nicknamen hinzu!';
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

    // private getNicknames(): void {
    //     this.chatService$ = this.chatService.getNicknames().subscribe({
    //         next: (response: string[]) => {
    //             response.forEach((element) => {
    //                 this.nicknames.push(element);
    //             })
    //         },
    //         error: (error: Error) => {
    //             this.errorMessage = error.message;
    //         }
    //     })
    // }

}