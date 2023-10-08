import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { AuthGuard } from "./core/guard/auth.guard";
import { ErrorPageComponent } from "./views/layouts/error-page/error-page.component";
import { BaseModule } from "./views/layouts/base/base.module";
import { SharedModule } from "./shared/shared.module";
import { SocialComponent } from "./views/layouts/social/social.component";
import { environment } from "../environments/environment";

// NGRX
// @ngrx
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, SocialComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
