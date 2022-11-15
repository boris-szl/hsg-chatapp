import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Chat } from "../chat.model";
import { ChatService } from "../chat.service";
import { SharedService } from "src/app/shared/shared.Service";


@Component({
    selector: 'app-chat-output',
    templateUrl: './chat-output.component.html',
    styleUrls: ['./chat-output.component.css']
})

export class ChatOutputComponent implements OnInit, OnDestroy{

    @Input() username = '';

    timestamp: string = new Date().toLocaleString('de');
    
    chats: Chat[] = [];
    private chatSub: Subscription = new Subscription();

    constructor(public chatService: ChatService) {}

    ngOnInit(): void {
        this.chatService.getChats();
        this.chatSub = this.chatService.getChatUpdateListener()
        .subscribe((chats: Chat[]) => {
            this.chats = chats;
        });
    }

    ngOnDestroy(): void {
        this.chatSub.unsubscribe();
    }

}