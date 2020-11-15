import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../environments/environment.prod";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public errorMessage: string = null;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(phone: string, password: string) {
    return this.http.get<any>(
      `${environment.routes.api}/users/get/${phone}`
    ).pipe(map((user) => {
      if (user) {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        let token = window.btoa(phone + ':' + password);
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      } else {
        this.showError("Неверно введен номер телефона или пароль.", 3);
      }
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  showError(message: string, timeout: number): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.hideError();
    }, timeout * 1000);
  }

  hideError(): void {
    this.errorMessage = null;
  }
}
