import { Action } from "redux"

import { Employee } from '../models/employee'

// import { UserSignupRequest } from '../models/user-signup-request'
// import { UserSigninRequest } from '../models/user-signin-request'

export interface EmployeeState {
  // id: string | null;
  employee: Employee | null;
  data: Employee[];
  fetchLoading: boolean;
  id: string | undefined;
  // signinLoading: boolean;
  // signoutLoading: boolean;
}

export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST'
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS'
export const FETCH_EMPLOYEES_ERROR = 'FETCH_EMPLOYEES_ERROR'
// export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST'
// export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS'
// export const CREATE_EMPLOYEE_ERROR = 'CREATE_EMPLOYEE_ERROR'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'

// export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
// export const USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR'
// export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'
// export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'
// export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR'
// export const USER_SIGNOUT_REQUEST = 'USER_SIGNOUT_REQUEST'
// export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS'
// export const USER_SIGNOUT_ERROR = 'USER_SIGNOUT_ERROR'

export interface FetchEmployeesRequestAction extends Action {
  type: typeof FETCH_EMPLOYEES_REQUEST;
  payload: Employee[];
}

export interface FetchEmployeesSuccessAction extends Action {
  type: typeof FETCH_EMPLOYEES_SUCCESS;
  payload: Employee[]; // Employees array
}

export interface FetchEmployeesErrorAction extends Action {
  type: typeof FETCH_EMPLOYEES_ERROR;
  payload: string; // Error message for now
}

export interface CreateEmployeeAction extends Action {
  type: typeof CREATE_EMPLOYEE;
  payload: Employee; // Employees array
}

export interface RemoveEmployeeAction extends Action {
  type: typeof REMOVE_EMPLOYEE;
  payload: string; // Employee key
}

// export interface CreateEmployeeRequestAction extends Action {
//   type: typeof CREATE_EMPLOYEE_REQUEST;
//   payload: Employee;
// }

// export interface CreateEmployeeSuccessAction extends Action {
//   type: typeof CREATE_EMPLOYEE_SUCCESS;
//   // payload: Employee[]; // Employees array
// }

// export interface CreateEmployeeErrorAction extends Action {
//   type: typeof CREATE_EMPLOYEE_ERROR;
//   payload: string; // Error message for now
// }

// export interface UserSigninRequestAction extends Action {
//   type: typeof USER_SIGNIN_REQUEST;
//   payload: UserSigninRequest;
// }

// export interface UserSigninSuccessAction extends Action {
//   type: typeof USER_SIGNIN_SUCCESS;
//   payload: string; // User id
// }

// export interface UserSigninErrorAction extends Action {
//   type: typeof USER_SIGNIN_ERROR;
//   payload: string; // Error message for now
// }

// export interface UserSignoutRequestAction extends Action {
//   type: typeof USER_SIGNOUT_REQUEST;
// }

// export interface UserSignoutSuccessAction extends Action {
//   type: typeof USER_SIGNOUT_SUCCESS;
// }

// export interface UserSignoutErrorAction extends Action {
//   type: typeof USER_SIGNOUT_ERROR;
//   payload: string; // Error message for now
// }

export type EmployeeActionTypes = 
FetchEmployeesRequestAction | FetchEmployeesSuccessAction | FetchEmployeesErrorAction |
CreateEmployeeAction | RemoveEmployeeAction;
// UserSignupRequestAction | UserSignupSuccessAction | UserSignupErrorAction |
// UserSigninRequestAction | UserSigninSuccessAction | UserSigninErrorAction |
// UserSignoutRequestAction | UserSignoutSuccessAction | UserSignoutErrorAction;
