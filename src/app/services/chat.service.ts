import { Injectable } from "@angular/core";
import { Chat } from "../models/chat.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class ChatService {
    private chats: Chat[] = [];
    private chatHistory =  new Subject<Chat[]>();

    constructor(private http: HttpClient) {}
    
    getChats() {
        this.http.get<{message: string, chats: any}>('http://localhost:3000/api/chats')
        .pipe(map((chatData) => {
            return chatData.chats.map((chat: any) => { 
                return {
                    id: chat._id,
                    username: chat.username,
                    message: chat.message,
                    date: chat.date
                };
            });
        }))
        .subscribe((transformedChats) => {
            this.chats = transformedChats;
            this.chatHistory.next([...this.chats]);
        });
    }

    getChatUpdateListener() {
        return this.chatHistory.asObservable();
    }

    addChatMessage(name: string, content: string, dateTime: string) {
        const chat: Chat = { id: "", username: name, message: content, date: dateTime};
        this.http.post<{message: string, chatId: string }>('http://localhost:3000/api/chats', chat)
        .subscribe((responseData) => {
            console.log(responseData.message);
            const chatId = responseData.chatId;
            chat.id = chatId;
            this.chats.push(chat)
            this.chatHistory.next([...this.chats]);
        })
    }

    // addChatMessage(chatId: string, message: string): Observable<any> {
    //     const 
    // }
}