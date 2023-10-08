import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import * as Feather from "feather-icons";
import { LinkedinService } from "src/app/core/services/linkedIn.services";
import { Observable } from "rxjs";
// NGRX
import { Store } from "@ngrx/store";
import { State, getNetworkRegisterdStatus } from "src/app/reducers/index";
import { Register } from "../../../views/pages/social/store/actions/social.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-network",
  templateUrl: "./network.component.html",
  styleUrls: ["./network.component.scss"],
})
export class NetworkComponent implements OnInit, AfterViewInit {
  windowRef = null;
  isNetworkAdded: Observable<boolean>;
  @Output()
  registerNetwork: EventEmitter<any> = new EventEmitter();
  @Output()
  modalClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  disable = false;
  constructor(public linkedIn: LinkedinService, private store: Store<State>) {
    this.isNetworkAdded = this.store.select(getNetworkRegisterdStatus).pipe();
  }

  ngOnInit(): void {
    // TODO: Need to check whether the client already have any account
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  getNetworkAuthUrl() {
    this.linkedIn.getAuthUrl().subscribe((data) => {
      this.windowRef = window.open(
        data["data"]["auth_url"],
        "child",
        "toolbar=no,location=no,directories=no,status=no,menubar=no,titlebar=no,fullscreen=no,scrollbars=1,resizable=no,width=700,height=700,left=25%,top=100"
      );

      this.windowRef.addEventListener(
        "message",
        this.receivemessage.bind(this),
        false
      );
    });
  }

  close() {
    this.modalClose.emit();
  }

  receivemessage(evt: any) {
    if (evt.data.token) {
      this.store.dispatch(new Register(evt.data));
      this.registerNetwork.emit(evt.data);
    }
  }
}
