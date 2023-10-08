/**
 * @module Core.
 * @description this include common module of the all projects
 * @author Nasmy Ahamed
 * @date 2021-01-16
 */

import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { PassportInterceptor } from "./interceptor/passport.interceptor";
import { ResponseInterceptor } from "./interceptor/response.interceptor";
import { AuthGuard } from "./guard/auth.guard";

// services
import { AuthService } from "./services/auth.service";
import { LinkedinService } from "./services/linkedIn.services";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PassportInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthService,
    AuthGuard,
    LinkedinService,
  ],
})
export class CoreModule {}
