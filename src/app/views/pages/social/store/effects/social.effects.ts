/**
 * @effects Social
 * @description This contain social related effects
 */

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LinkedinService } from "../../../../../core/services/linkedIn.services";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";

import {
  Register,
  RegisterSuccess,
  RegisterFailed,
  SocialActionTypes,
  RegisterStore,
} from "../actions/social.actions";
import { ResponseHandlerService } from "src/app/core/services/response-handler.service";

@Injectable()
export class SocialEffects {
  @Effect()
  RegisterStore$ = this.actions$.pipe(
    ofType(SocialActionTypes.NETWORK_STORE),
    tap((action) => {
      // get the current actions from local storage
      const storedActions = window.localStorage.getItem("registerItems");
      // parse the actions as an array
      const actions = storedActions ? JSON.parse(storedActions) : [];
      // add the new action as first item to the actions array
      const newActions = [action, ...actions];
      // serialize the new array and update local storage
      window.localStorage.setItem("registerItems", JSON.stringify(newActions));
    })
  );
  // Sign Up Related
  @Effect()
  Register$ = this.actions$.pipe(
    ofType(SocialActionTypes.NETWORK_REGISTER),
    switchMap((data: Register) =>
      this.ln.register(data.payload).pipe(
        map((resObj: any) =>
          this.resHandler.apiResponse(resObj)
            ? new RegisterSuccess(resObj)
            : new RegisterFailed(resObj)
        ),
        catchError((resObj) => of(new RegisterFailed(resObj.error)))
      )
    )
  );

  @Effect({ dispatch: false })
  RegisterSuccess$ = this.actions$.pipe(
    ofType(SocialActionTypes.NETWORK_REGISTERED_SUCCESS),
    map(({ payload }) => {
      // this.resHandler.notifyMessage(payload);
      this.modalService.dismissAll();
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 11000,
        title: "Success",
        icon: "success",
      });

      window.close();
    })
  );

  @Effect({ dispatch: false })
  RegisterFailed$: Observable<any> = this.actions$.pipe(
    ofType(SocialActionTypes.NETWORK_REGISTERED_FAILED),
    map(({ payload }) => {
      this.resHandler.notifyMessage(payload);
    })
  );

  constructor(
    private actions$: Actions,
    private ln: LinkedinService,
    private resHandler: ResponseHandlerService,
    private modalService: NgbModal,
    private router: Router
  ) {}
}
