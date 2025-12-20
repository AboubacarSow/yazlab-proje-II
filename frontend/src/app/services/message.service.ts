import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageDto } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly POST_MESSAGE =environment.apiUrl +'messages';
  //private readonly PUT_MESSAGE = (messageId: number)=>{return environment.apiUrl + 'messages/' + messageId};
  private readonly DEL_MESSAGE = (messageId: number)=>{return environment.apiUrl + 'messages/' + messageId};
  private readonly GET_MESSAGES = environment.apiUrl + 'messages';
  private readonly GET_MESSAGE = (messageId: number) =>{return environment.apiUrl + 'messages/'+ messageId}

  constructor(private http : HttpClient) { }

  getAllMessages(): Observable<Message[]>{
    return this.http.get<Message[]>(this.GET_MESSAGES)
  }

  getMessage(messageId : number): Observable<Message>{
    return this.http.get<Message>(this.GET_MESSAGE(messageId));
  }

  sendMessage(message : MessageDto) {
    this.http.post(this.POST_MESSAGE, message)
            .subscribe()
  }

  deleteMessage(messageId : number){
    this.http.delete(this.DEL_MESSAGE(messageId))
              .subscribe()
  }
}
