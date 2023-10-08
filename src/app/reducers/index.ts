/**
 * @reducer root
 * @description This is root reducer and append all child reducers
 * @author Nasmy Ahamed
 * @date 2021-01-23
 */
import {
  ActionReducer, // TODO if we no need we will remove this in feature
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";

import * as fromSocial from "../views/pages/social/store/reudcers/social.reducer";

export interface State {
  social: fromSocial.State;
}

export const reducers: ActionReducerMap<State> = {
  social: fromSocial.socialReducer,
};

// State slector in each components
export const selectSocialState = createFeatureSelector<fromSocial.State>(
  "social"
);

// Network related status.
export const getNetworkRegisterdStatus = createSelector(
  selectSocialState,
  fromSocial.getNetworkRegisterdStatus
);

export const getRegisterdNetworkInfo = createSelector(
  selectSocialState,
  fromSocial.getRegisterdNetworkInfo
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
