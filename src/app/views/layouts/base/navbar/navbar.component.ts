import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth.service";
import { Observable } from "rxjs";
import { user, UserInfo } from "../../../../core/models/userInfo";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  users: any;
  avatarUrl: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private authSevice: AuthService
  ) {}

  ngOnInit(): void {
    this.users = user;
    this.avatarUrl = environment.assetUrl + this.users.avatar;
    console.log(this.users);
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle("sidebar-open");
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");

    if (!this.authSevice.isAuthenticated) {
      this.router.navigate(["/auth/login"]);
    }
  }
}
