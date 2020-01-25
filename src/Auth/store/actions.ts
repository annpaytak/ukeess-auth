import { ActionCreator } from "redux"

import {
  UserSigninRequestAction, USER_SIGNIN_REQUEST,
  UserSigninSuccessAction, USER_SIGNIN_SUCCESS,
  UserSigninErrorAction, USER_SIGNIN_ERROR,
  UserSignoutRequestAction, USER_SIGNOUT_REQUEST,
  UserSignoutSuccessAction, USER_SIGNOUT_SUCCESS,
  UserSignoutErrorAction, USER_SIGNOUT_ERROR,
} from './types'

import { UserSigninRequest } from '../models/user-signin-request'


export const userSigninRequest: ActionCreator<UserSigninRequestAction> = (request: UserSigninRequest): UserSigninRequestAction => {
  return {
    type: USER_SIGNIN_REQUEST,
    payload: request
  };
}

export const userSigninSuccess: ActionCreator<UserSigninSuccessAction> = (email: string): UserSigninSuccessAction => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: email
  };
}

export const userSigninError: ActionCreator<UserSigninErrorAction> = (error: string): UserSigninErrorAction => {
  return {
    type: USER_SIGNIN_ERROR,
    payload: error
  };
}

export const userSignoutRequest: ActionCreator<UserSignoutRequestAction> = (): UserSignoutRequestAction => {
  return {
    type: USER_SIGNOUT_REQUEST
  };
}

export const userSignoutSuccess: ActionCreator<UserSignoutSuccessAction> = (): UserSignoutSuccessAction => {
  return {
    type: USER_SIGNOUT_SUCCESS
  };
}

export const userSignoutError: ActionCreator<UserSignoutErrorAction> = (error: string): UserSignoutErrorAction => {
  return {
    type: USER_SIGNOUT_ERROR,
    payload: error
  };
}