import { Action } from "redux"

import { UserSignupRequest } from '../models/user-signup-request'
import { UserSigninRequest } from '../models/user-signin-request'

export interface AuthState {
  id: string | null;
  email: string | null;
  signupLoading: boolean;
  signinLoading: boolean;
  signoutLoading: boolean;
}

export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR'
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR'
export const USER_SIGNOUT_REQUEST = 'USER_SIGNOUT_REQUEST'
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS'
export const USER_SIGNOUT_ERROR = 'USER_SIGNOUT_ERROR'

export interface UserSignupRequestAction extends Action {
  type: typeof USER_SIGNUP_REQUEST;
  payload: UserSignupRequest;
}

export interface UserSignupSuccessAction extends Action {
  type: typeof USER_SIGNUP_SUCCESS;
  payload: string; // User id
}

export interface UserSignupErrorAction extends Action {
  type: typeof USER_SIGNUP_ERROR;
  payload: string; // Error message for now
}

export interface UserSigninRequestAction extends Action {
  type: typeof USER_SIGNIN_REQUEST;
  payload: UserSigninRequest;
}

export interface UserSigninSuccessAction extends Action {
  type: typeof USER_SIGNIN_SUCCESS;
  payload: string; // User id
}

export interface UserSigninErrorAction extends Action {
  type: typeof USER_SIGNIN_ERROR;
  payload: string; // Error message for now
}

export interface UserSignoutRequestAction extends Action {
  type: typeof USER_SIGNOUT_REQUEST;
}

export interface UserSignoutSuccessAction extends Action {
  type: typeof USER_SIGNOUT_SUCCESS;
}

export interface UserSignoutErrorAction extends Action {
  type: typeof USER_SIGNOUT_ERROR;
  payload: string; // Error message for now
}

export type AuthActionTypes = 
UserSignupRequestAction | UserSignupSuccessAction | UserSignupErrorAction |
UserSigninRequestAction | UserSigninSuccessAction | UserSigninErrorAction |
UserSignoutRequestAction | UserSignoutSuccessAction | UserSignoutErrorAction;
