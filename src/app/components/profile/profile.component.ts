import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public selectedTab: string = 'main';

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
