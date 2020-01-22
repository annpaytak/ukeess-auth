import { takeEvery, all } from "@redux-saga/core/effects"// put

//modals if needed

import {
  UserSignupRequestAction, USER_SIGNUP_REQUEST,
  // UserSignupSuccessAction,
   USER_SIGNUP_SUCCESS,
  UserSigninRequestAction, USER_SIGNIN_REQUEST,
  // UserSigninSuccessAction,
   USER_SIGNIN_SUCCESS,
  // UserSignoutRequestAction,
   USER_SIGNOUT_REQUEST,
  // UserSignoutSuccessAction,
   USER_SIGNOUT_SUCCESS,
} from './types'
import { EmployeesService } from "../../CreateEmployee/services/employees.service";

// import { AuthService } from '../services/auth.service'

// React on user signup request => processing signup
async function onUserSignupRequest(action: UserSignupRequestAction): Promise<void> {
  try {
    // console.log(action.payload);
  } catch (error) {
    console.log(error);
  } 
}

function* watchUserSignupRequest() {
  yield takeEvery(USER_SIGNUP_REQUEST, onUserSignupRequest);
}

// React on user signin request => processing signin
async function onUserSigninRequest(action: UserSigninRequestAction): Promise<void> {
  try {
    const employeesService = new EmployeesService();
    employeesService.signInGoogle();
  } catch (error) {
    console.log(error);
  } 
}

function* watchUserSigninRequest() {
  yield takeEvery(USER_SIGNIN_REQUEST, onUserSigninRequest);
}

// React on user signout request => processing signout
async function onUserSignoutRequest(action: UserSigninRequestAction): Promise<void> {
  try {
    const employeesService = new EmployeesService();
    employeesService.signOut();
  } catch (error) {
    console.log(error);
  } 
}

function* watchUserSignoutRequest() {
  yield takeEvery(USER_SIGNOUT_REQUEST, onUserSignoutRequest);
}

function* onUserSignupSuccess() {
  // yield put(fn);
}

function* watchUserSignupSuccess() {
  yield takeEvery(USER_SIGNUP_SUCCESS, onUserSignupSuccess);
}

function* onUserSigninSuccess() {
  // yield put(fn);
}

function* watchUserSigninSuccess() {
  yield takeEvery(USER_SIGNIN_SUCCESS, onUserSigninSuccess);
}

function* onUserSignoutSuccess() {
  // yield put(fn);
}

function* watchUserSignoutSuccess() {
  yield takeEvery(USER_SIGNOUT_SUCCESS, onUserSignoutSuccess);
}

export function* authSaga(){
  yield all([
    watchUserSignupRequest(),
    watchUserSigninRequest(),
    watchUserSignoutRequest(),
    watchUserSignupSuccess(),
    watchUserSigninSuccess(),
    watchUserSignoutSuccess(),
  ])
}
