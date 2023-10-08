import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import {
  State,
  getNetworkRegisterdStatus,
  getRegisterdNetworkInfo,
} from "src/app/reducers/index";
import { Register } from "..//store/actions/social.actions";

import { Modal } from "../../../../core/models/modal";
import { LinkedInPayload } from "src/app/core/models/social.model";
import { LinkedinService } from "src/app/core/services/linkedIn.services";
import * as Feather from "feather-icons";
import Swal from "sweetalert2";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"],
})
export class MemberComponent implements OnInit, AfterViewInit {
  registerdNetwork: LinkedInPayload[] = [];
  getRegisterdState: Observable<any>;
  @ViewChild("viewNetworks") viewNetwork: ElementRef;
  constructor(
    public modal: Modal,
    private store: Store<State>,
    private linledIn: LinkedinService
  ) {
    this.getRegisterdState = this.store.select(getRegisterdNetworkInfo);
    window.addEventListener("storage", () => {
      // When local storage changes, dump the list to
      // the console.
      if (localStorage.getItem("newNetwork")) {
        let newNetwork = JSON.parse(localStorage.getItem("newNetwork"));
        this.registerdNetwork = Array.of(newNetwork);
        localStorage.removeItem("newNetwork");
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 11000,
          title: "Success",
          icon: "success",
        });
        modal.closeModal();
      }
    });
  }

  ngOnInit(): void {
    this.linledIn.list().subscribe(
      (data) => {
        this.registerdNetwork = data["data"]["networkInfo"];
      },
      (error) => {}
    );
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  openXlModal() {
    this.viewNetwork.nativeElement.click();
  }

  getRegisterdNetwork(event: any) {
    this.getRegisterdState.subscribe((state) => {
      if (state.data) {
        this.registerdNetwork = Array.of(event);
      }
    });
  }
}
