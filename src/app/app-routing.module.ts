import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guard/auth.guard";
import { ErrorPageComponent } from "./views/layouts/error-page/error-page.component";
import { BaseComponent } from "./views/layouts/base/base.component";
import { SocialComponent } from "./views/layouts/social/social.component";

const routes: Routes = [
  // { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("src/app/views/layouts/auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },

  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/views/pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: "social",
    component: BaseComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/views/pages/social/social.module").then(
        (m) => m.SocialModule
      ),
  },

  {
    path: "network",
    component: SocialComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("src/app/views/pages/social/social.module").then(
        (m) => m.SocialModule
      ),
  },

  /*{
    path: "",
    component: BaseComponent,
    loadChildren: () =>
      import("./views/pages/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
    // canActivate: [AuthGuard],
  },*/

  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: "Page Not Found",
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },

  { path: "**", redirectTo: "error", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
