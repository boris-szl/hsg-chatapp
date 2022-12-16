import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly actionUrl = 'http://localhost:3000/history';
  // private readonly actionUrl = 'http://cloud-api-somewhere.com';

  constructor(private httpClient: HttpClient) {}

  public addToHistory(message: ChatMessage): Observable<ChatMessage> {
    return this.httpClient.post<ChatMessage>(this.actionUrl, message);
  }

  public getHistory(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.actionUrl);
  }
}