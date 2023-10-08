import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../../../shared/shared.module";
import {
  NgbDropdownModule,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

// Ngx-spinnermodule
import { NgxSpinnerModule } from "ngx-spinner";

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from "ng2-charts";

// TinyMice
import { EditorModule } from "@tinymce/tinymce-angular";

// componnents
import { MemberComponent } from "./member/member.component";
import { LinkedInComponent } from "./linked-in/linked-in.component";

// Ng-select
import { NgSelectModule } from "@ng-select/ng-select";

// Store Ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromSocial from "./store/reudcers/social.reducer";
import { from } from "rxjs";
import { SocialEffects } from "./store/effects/social.effects";
import { ProfileComponent } from "./profile/profile.component";
import { PostComponent } from "./post/post.component";
import { CreateComponent } from "./post/create/create.component";
import { ViewComponent } from "./post/view/view.component";

const routes: Routes = [
  {
    path: "member",
    component: MemberComponent,
  },
  {
    path: "callback",
    component: LinkedInComponent,
  },
  {
    path: "post",
    component: PostComponent,
  },
  {
    path: "list",
    component: ViewComponent,
  },
];

@NgModule({
  declarations: [
    MemberComponent,
    LinkedInComponent,
    ProfileComponent,
    PostComponent,
    CreateComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ChartsModule,
    NgSelectModule, // Ng-select
    EditorModule,
    SharedModule,
    StoreModule.forFeature("social", fromSocial.socialReducer),
    EffectsModule.forFeature([SocialEffects]),
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule,
  ],
})
export class SocialModule {}
