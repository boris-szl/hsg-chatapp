import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatService } from "../../../shared/services/chat.service";
import { ChatMessage } from "src/app/shared/models/message";
import { response } from "express";


@Component({
    selector: 'chat-area',
    templateUrl: './chat-area.component.html',
    styleUrls: ['./chat-area.component.css']
})

export class ChatArea implements OnInit, OnDestroy, AfterViewChecked {
    
    @Input() nickname = '';

    public errorMessage = '';
    private chatService$?: Subscription;
    public messages: ChatMessage[] = [];

    @ViewChild('scrollFrame') private scrollFrame!: ElementRef<HTMLElement>;

    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    constructor(private chatService: ChatService) {}


    ngOnDestroy(): void {
        this.chatService$?.unsubscribe();
    }

    ngOnInit(): void {
        this.getHistory();
        this.scrollTo();
        this.scrollToBottom();

        setInterval(() => {
            this.getHistory();
        }, 500);
    }

    ngAfterViewChecked() {        
        this.scrollToBottom();        
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

    private scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
}