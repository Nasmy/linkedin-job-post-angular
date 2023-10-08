import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "./../../../environments/environment";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { user } from "../models/userInfo";

@Injectable()
export class PassportInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    request = request.clone({
      headers: auth.getTokenHeader(request),
      url: this.fixUrl(request.url),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.modifyBody(event) });
        }
        return event;
      })
    );
  }

  private modifyBody({ body: body }) {
    if (!body) {
      return body;
    }
  }

  private fixUrl(url: string) {
    const tenantId = "dev";
    if (url.indexOf("http://") >= 0 || url.indexOf("https://") >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + tenantId + url;
    }
  }
}
