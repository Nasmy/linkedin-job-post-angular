import { Action } from "@ngrx/store";
import { SocialActions, SocialActionTypes } from "../actions/social.actions";

import { LinkedInPayload } from "../../../../../core/models/social.model";

export interface State {
  isNetworkAdded: boolean;
  linkedInPayload: LinkedInPayload | any;
}

const initialState: State = {
  isNetworkAdded: false,
  linkedInPayload: {},
};
export function socialReducer(state = initialState, action: SocialActions) {
  switch (action.type) {
    case SocialActionTypes.NETWORK_REGISTER:
      return {
        ...state,
      };
    case SocialActionTypes.NETWORK_REGISTERED_SUCCESS:
      return {
        ...state,
        isNetworkAdded: true,
        linkedInPayload: action.payload,
      };
    case SocialActionTypes.NETWORK_REGISTERED_FAILED:
      return {
        ...state,
      };
  }
}

export const getNetworkRegisterdStatus = (state: State) => state.isNetworkAdded;
export const getRegisterdNetworkInfo = (state: State) => state.linkedInPayload;
