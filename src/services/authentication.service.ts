import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Validators} from '../utils/Validators';
import {RestService} from './rest.service';

export class Session {
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static SESSION_PARAMS = ["login", "role"];

  constructor(
    private restService: RestService
  ) {
  }

  public authenticate(login: string, password: string): Observable<any> {
    const validationResult = Validators.validateCredentials(login, password);
    if (validationResult) {
      throw new Error(validationResult);
    }

    return this.restService.post(
      'login',
      {
        username: login,
        password
      }
    );
  }

  public setSession(session: Session): void {
    if (session) {
      for (const sessionParam of AuthenticationService.SESSION_PARAMS) {
        localStorage.setItem(sessionParam, session[sessionParam]);
      }
    }
  }

  public resetSession(): void {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    let isAuthenticated = true;
    for (const sessionParam of AuthenticationService.SESSION_PARAMS) {
      isAuthenticated = isAuthenticated && !!localStorage.getItem(sessionParam);
    }
    return isAuthenticated;
  }
}
