import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {CustomButton} from "../popup/popup.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public selectedTab: string = 'main';

  public supportChatButton: CustomButton = {
    title: "Отправить сообщение",
    onClick: () => {
      alert("Message was sent.");
    },
    onClickParams: {}
  }

  constructor(
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.selectedTab = localStorage.getItem("selectedTab");
  }

  onTabClick(tab: string): void {
    this.selectedTab = tab;
    localStorage.setItem("selectedTab", tab);
  }

}
