import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor() {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  get userMessage(): string {
    return `${this.user.firstName}`;
  }

}
