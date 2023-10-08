import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class LinkedinService {
  provider = "LN";
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient,
    private route: Router, // private toastrService: ToastrService
    private auth: AuthService
  ) {}

  getAuthUrl() {
    return this.http.get("/ln/authUrl");
  }

  getAuthInfo(payload) {
    return this.http.get("/ln/callback", {
      params: {
        code: payload.code,
        tenant: payload.tenant,
      },
    });
  }

  register(payload) {
    return this.http.post("/network/register", payload);
  }

  list() {
    return this.http.get("/network/list");
  }

  listByType() {
    return this.http.get("/network/list/" + this.provider);
  }

  post(payload) {
    return this.http.post("/ln/post", payload);
  }

  postList(payload) {
    switch(payload) {
       case 'LN':
        return this.http.get("/ln/listPost");
    }
    
  }
}
