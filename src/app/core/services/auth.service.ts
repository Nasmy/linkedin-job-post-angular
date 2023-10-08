import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private route: Router // private toastrService: ToastrService
  ) {}

  /**
   * @description get token header
   */
  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    const token = this.getUserToken();
    if (token) {
      return new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      });
    }
  }

  getFormDataHeader(request: HttpRequest<any>): HttpHeaders {
    const token = this.getUserToken();
    if (token) {
      return new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      });
    }
  }

  /**
   * @description Get user token to JWT interceptor
   */
  getUserToken() {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem("token");
      if (token === null) {
        token = localStorage.getItem("tmpToken");
      }
      return token ? token : null;
    } else {
      return null;
    }
  }

  /**
   * @description User login api call
   * TODO According to api call the request will change.
   */
  login(payload) {
    const url = `/user/login`;
    return this.http.post(url, payload);
  }

  /**
   * @description Check if the user is authenticated
   */
  get isAuthenticated() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
