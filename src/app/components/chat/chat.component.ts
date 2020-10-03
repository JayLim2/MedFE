import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/Message";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  private _messages: Message[] = [];

  constructor() { }

  ngOnInit(): void {
    this.addMessage("1", "user1", "bla bla bla", "10.10.2020 11:57");
    this.addMessage("2", "user1", "bla bla bla", "10.10.2020 11:58");
    this.addMessage("3", "support", "Hello", "10.10.2020 12:21");
    this.addMessage("4", "user1", "Bye", "10.10.2020 12:29");
  }

  get messages(): Message[] {
    return this._messages;
  }

  public addMessage(
    id: string,
    user: string,
    text: string,
    datetime: string
  ): void {
    const message: Message = { id, user, text, datetime };
    this._messages.push(message);
  }

  public removeMessage(id: string): void {
    for (let i = 0; i < this.messages.length; i++) {
      if(this.messages[i].id === id) {
        this._messages.splice(i, 1);
        return;
      }
    }
  }

  public isCurrentUserMessage(message: Message): boolean {
    const currentUser = localStorage.getItem("login");
    return currentUser === message.user;
  }

}
