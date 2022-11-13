import { Injectable } from "@angular/core";
import { Chat } from "./chat.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../profile-components/user.model";

@Injectable({providedIn: 'root'})
export class ChatService {
    private username: string = "";
    private user: User[] = [];
    private chats: Chat[] = [];
    private chatHistory =  new Subject<Chat[]>();

    constructor(private http: HttpClient) {}

    getChats() {
        this.http.get<{message: string, chats: Chat[]}>('http://localhost:3000/api/chats').subscribe((chatData) => {
            this.chats = chatData.chats;
            this.chatHistory.next([...this.chats]);
        });
    }

    getChatUpdateListener() {
        return this.chatHistory.asObservable();
    }

    getUsername() {
        this.http.get<{message: string, username: User[]}>('http/localhost:3000/api/user').subscribe((userData) => {
            this.user = userData.username;
        });
    }

    addUsername(username_val: string) {
        const user: User = { username: username_val };
        this.http.post<{message: string}>('http://localhost:3000/api/user', user).subscribe((responseData) => {
            console.log(responseData.message);
            this.user.push(user);
        })
    }

    addChatMessage(id: string, content: string) {
        const chat: Chat = { userId: "user01", username: 'ServiceDesk', chatContent: content};
        this.http.post<{message: string}>('http://localhost:3000/api/chats', chat).subscribe((responseData) => {
            console.log(responseData.message);
            this.chats.push(chat)
            this.chatHistory.next([...this.chats]);
        })

    }
}