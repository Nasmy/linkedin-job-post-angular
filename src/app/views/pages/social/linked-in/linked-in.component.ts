import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LinkedinService } from "src/app/core/services/linkedIn.services";

// NGRX
import { Store } from "@ngrx/store";
import {
  State,
  selectSocialState,
  getNetworkRegisterdStatus,
  getRegisterdNetworkInfo,
} from "../../../../reducers/index";
import { NETWORK_REGISTER, Register } from "../store/actions/social.actions";
import { LinkedInPayload } from "src/app/core/models/social.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-linked-in",
  templateUrl: "./linked-in.component.html",
  styleUrls: ["./linked-in.component.scss"],
})
export class LinkedInComponent implements OnInit {
  getRegisterdState: Observable<any>;
  public tenantId: string;
  public code: any;
  public userInfo: any;
  public payload: any;
  public isLinkedInLoaded: boolean = false;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private linkedInService: LinkedinService,
    private store: Store<State>
  ) {
    this.getRegisterdState = this.store.select(getRegisterdNetworkInfo);
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.tenantId = params.tenant;
      this.code = params.code;
      this.payload = { code: this.code, tenant: this.tenantId };
      this.linkedInService.getAuthInfo(this.payload).subscribe((data) => {
        this.userInfo = data["data"]["userInfo"];
        this.isLinkedInLoaded = true;
      });
    });
  }

  addMember() {
    // parent.postMessage(this.userInfo, location.origin);
    this.store.dispatch(new Register(this.userInfo));
    this.getRegisterdState.subscribe((state) => {
      if (state.data) {
        localStorage.setItem("newNetwork", JSON.stringify(state.data));
      }
    });
    // window.close();
    // console.log(this.userInfo);
    // parent.postMessage(this.userInfo, location.origin);
    // window.close();
    /*this.store.dispatch(new Register(this.userInfo));
    opener.location.reload(); //This will refresh parent window.
    window.close(); //Close child window. You may also use self.close();*/
  }
}
