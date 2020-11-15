import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent implements OnInit, AfterViewInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

  ngAfterViewInit() {
    this.ngOnInit();
  }

}
