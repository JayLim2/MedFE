import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this.authenticationService.currentUserValue;
    const authToken = localStorage.getItem("token");
    if (currentUser && authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authToken}`
        }
      });
    }

    return next.handle(request);
  }
}
