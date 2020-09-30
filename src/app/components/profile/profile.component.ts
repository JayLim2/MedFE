import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public selectedTab: TemplateRef<any>;

  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  onTabClick(tab: TemplateRef<any>): void {
    this.selectedTab = tab;
  }

}
