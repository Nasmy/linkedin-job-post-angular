import { Action } from "@ngrx/store";
import { LinkedInPayload } from "../../../../../core/models/social.model";

export const NETWORK_STORE = "NETWORK_STORE";
export const NETWORK_REGISTER = "NETWORK_REGISTER";
export const NETWORK_REGISTERED_SUCCESS = "NETWORK_REGISTERED_SUCCESS";
export const NETWORK_REGISTERED_FAILED = "NETWORK_REGISTERED_FAILED";

export enum SocialActionTypes {
  NETWORK_STORE = "Store Register",
  NETWORK_REGISTER = "Register",
  NETWORK_REGISTERED_SUCCESS = "Network Register Success",
  NETWORK_REGISTERED_FAILED = "Network Register Failed",
}

export class RegisterStore implements Action {
  readonly type = SocialActionTypes.NETWORK_STORE;
  constructor(public payload: any) {}
}

export class Register implements Action {
  readonly type = SocialActionTypes.NETWORK_REGISTER;
  constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
  readonly type = SocialActionTypes.NETWORK_REGISTERED_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterFailed implements Action {
  readonly type = SocialActionTypes.NETWORK_REGISTERED_FAILED;
  constructor(public payload: any) {}
}

export type SocialActions =
  | Register
  | RegisterSuccess
  | RegisterFailed
  | RegisterStore;
