import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/message';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly actionUrl = 'http://localhost:3000/history';
  private readonly nicknameUri = 'http://localhost:3000/nicknames';
  // private readonly actionUrl = 'http://cloud-api-somewhere.com';

  constructor(private httpClient: HttpClient) {}

  public addToHistory(message: ChatMessage): Observable<ChatMessage> {
    return this.httpClient.post<ChatMessage>(this.actionUrl, message);
  }

  public getHistory(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.actionUrl);
  }

  public setNicknames(nickname: User): Observable<User> {
    return this.httpClient.post<User>(this.nicknameUri, nickname);
  }

  public getNicknames(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.nicknameUri);
  }

  public updateNickname(newUsername: string): Observable<User> {
    return this.httpClient.put<User>(this.nicknameUri, newUsername);
  }
}