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

    chats: Chat[] = [];
    private chatSub: Subscription = new Subscription();

    username?: string;

    constructor(
        public chatService: ChatService,
        private shared: SharedService) {}
    

    ngOnInit(): void {
        this.username = this.shared.getMessage()
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