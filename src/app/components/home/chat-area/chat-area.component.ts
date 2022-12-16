import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatService } from "../../../shared/services/chat.service";
import { ChatMessage } from "src/app/shared/models/message";


@Component({
    selector: 'chat-area',
    templateUrl: './chat-area.component.html',
    styleUrls: ['./chat-area.component.css']
})

export class ChatArea implements OnInit, OnDestroy {
    
    @Input() nickname = '';
    
    public errorMessage = '';
    private chatService$?: Subscription;
    public messages: ChatMessage[] = [];


    @ViewChild('scrollFrame') private scrollFrame!: ElementRef<HTMLElement>;

    constructor(private chatService: ChatService) {}


    ngOnDestroy(): void {
        this.chatService$?.unsubscribe();
    }

    ngOnInit(): void {
        this.getHistory();
        this.scrollTo();

        setInterval(() => {
            this.getHistory();
        }, 2500);
    }

    public isItMe(nickname : string) : boolean {
        return this.nickname?.toLowerCase() === nickname?.toLocaleLowerCase();
    }

    private getHistory(): void {
        this.chatService$ = this.chatService.getHistory().subscribe({
            next: (response: ChatMessage[]) => {
                this.messages = response;
                this.scrollTo();
            },
            error: (error : Error) => {
                this.errorMessage = error.message;
            }
        });
    }

    private scrollTo(): void {
        this.scrollFrame?.nativeElement?.scroll({
            top: this.scrollFrame?.nativeElement?.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }
}