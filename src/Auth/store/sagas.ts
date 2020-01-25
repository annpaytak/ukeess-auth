import { takeEvery, all } from "@redux-saga/core/effects"// put

//modals to handle errors

import {
  UserSigninRequestAction, USER_SIGNIN_REQUEST,
  UserSignoutRequestAction, USER_SIGNOUT_REQUEST,
} from './types'

import { AuthService } from "../../Auth";

// React on user signin request => processing signin
async function onUserSigninRequest(action: UserSigninRequestAction): Promise<void> {
  try {
    const employeesService = new AuthService();
    employeesService.signInGoogle();
  } catch (error) {
    console.log(error);
  }
}

function* watchUserSigninRequest() {
  yield takeEvery(USER_SIGNIN_REQUEST, onUserSigninRequest);
}

// React on user signout request => processing signout
async function onUserSignoutRequest(action: UserSignoutRequestAction): Promise<void> {
  try {
    const employeesService = new AuthService();
    employeesService.signOut();
  } catch (error) {
    console.log(error);
  }
}

function* watchUserSignoutRequest() {
  yield takeEvery(USER_SIGNOUT_REQUEST, onUserSignoutRequest);
}


export function* authSaga() {
  yield all([
    watchUserSigninRequest(),
    watchUserSignoutRequest()
  ])
}
