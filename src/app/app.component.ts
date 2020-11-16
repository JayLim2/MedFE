import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {HealthCheckerService} from "../services/health-checker.service";
import {User} from "./models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  currentUser: User;

  constructor(
    public healthChecker: HealthCheckerService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUserObservable
      .subscribe(currentUser => {
        this.currentUser = currentUser;
      })
  }

  ngOnInit() {
    this.healthChecker.checkHealth();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }

}
