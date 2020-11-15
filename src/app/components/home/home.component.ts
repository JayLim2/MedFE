import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  userMessage: string

  constructor() {
  }

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem("currentUser"));
    this.userMessage = user && user.phone && user.role ? `${user.phone}` : null;
  }

}
