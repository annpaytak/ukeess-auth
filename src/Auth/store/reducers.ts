import { Reducer } from 'redux'

import {
  AuthState, AuthActionTypes,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_ERROR,
} from './types'

const initialState: AuthState = {
  id: null,
  email: null,
  signupLoading: false,
  signinLoading: false,
  signoutLoading: false,
}

export const authReducer: Reducer<AuthState, AuthActionTypes> = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  console.log(action);
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true
      }
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        id: action.payload
      }
    case USER_SIGNUP_ERROR:
      return {
        ...state,
        signupLoading: false,
        // Also payload is type string with error message so we can use it to show message to user
      }
    case USER_SIGNIN_REQUEST:
      return {
        ...state,
        signinLoading: true
      }
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        signinLoading: false,
        email: action.payload
      }
    case USER_SIGNIN_ERROR:
      return {
        ...state,
        signinLoading: false,
        // Also payload is type string with error message so we can use it to show message to user
      }
    case USER_SIGNOUT_REQUEST:
      return {
        ...state,
        signoutLoading: true
      }
    case USER_SIGNOUT_SUCCESS:
      return {
        ...state,
        signoutLoading: false,
        email: null
      }
    case USER_SIGNOUT_ERROR:
      return {
        ...state,
        signoutLoading: false,
        // Also payload is type string with error message so we can use it to show message to user
      }
    default:
      return state;
  }

}