import { Action } from "redux"

import { Employee } from '../models/employee'

export interface EmployeeState {
  employee: Employee | undefined;
  data: Employee[];
  fetchLoading: boolean;
  id: string | undefined;
  name: string | undefined;
}

export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST'
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS'
export const FETCH_EMPLOYEES_ERROR = 'FETCH_EMPLOYEES_ERROR'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const SEARCH_EMPLOYEE_REQUEST = 'SEARCH_EMPLOYEE_REQUEST'
export const SEARCH_EMPLOYEE_SUCCESS = 'SEARCH_EMPLOYEE_SUCCESS'
export const SEARCH_EMPLOYEE_ERROR = 'SEARCH_EMPLOYEE_ERROR'

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

export interface SearchEmployeeActionRequest extends Action {
  type: typeof SEARCH_EMPLOYEE_REQUEST;
  payload: string; // Employee name
}

export interface SearchEmployeeActionSuccess extends Action {
  type: typeof SEARCH_EMPLOYEE_SUCCESS;
  payload: Employee; // Employee name
}

export interface SearchEmployeeActionError extends Action {
  type: typeof SEARCH_EMPLOYEE_ERROR;
  payload: string; // Employee name
}

export type EmployeeActionTypes = 
FetchEmployeesRequestAction | FetchEmployeesSuccessAction | FetchEmployeesErrorAction |
CreateEmployeeAction | RemoveEmployeeAction |
SearchEmployeeActionRequest | SearchEmployeeActionSuccess | SearchEmployeeActionError;
