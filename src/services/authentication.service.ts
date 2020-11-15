import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from "../app/models/user.model";
import {environment} from "../environments/environment.prod";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(phone: string, password: string) {
    return this.http.get<any>(
      `${environment.routes.api}/users/get/${phone}`
    ).pipe(map((user) => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      let token = window.btoa(phone + ':' + password);
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
