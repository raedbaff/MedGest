import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private http:HttpClient) { }
  sendmessage(message:any):Observable<any>{
    const formData = new FormData();
    formData.append('sender', message.sender);
    formData.append('receiver', message.receiver);
    formData.append('content', message.content);
    return this.http.post(`http://127.0.0.1:8088/Messages/save/`,formData)


  }
  }

