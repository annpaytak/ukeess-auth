
import { ActionCreator } from "redux"

import { Employee } from '../models/employee'

import {
  FetchEmployeesRequestAction, FETCH_EMPLOYEES_REQUEST,
  FetchEmployeesSuccessAction, FETCH_EMPLOYEES_SUCCESS,
  FetchEmployeesErrorAction, FETCH_EMPLOYEES_ERROR,
  CreateEmployeeAction, CREATE_EMPLOYEE,
  RemoveEmployeeAction, REMOVE_EMPLOYEE,
  SearchEmployeeActionRequest, SEARCH_EMPLOYEE_REQUEST,
  SearchEmployeeActionSuccess, SEARCH_EMPLOYEE_SUCCESS,
  SearchEmployeeActionError, SEARCH_EMPLOYEE_ERROR
} from "./types";

export const fetchEmployeesRequest: ActionCreator<FetchEmployeesRequestAction> = (request: Employee[]): FetchEmployeesRequestAction => {
  return {
    type: FETCH_EMPLOYEES_REQUEST,
    payload: request
  };
}

export const fetchEmployeesSuccess: ActionCreator<FetchEmployeesSuccessAction> = (data: Employee[]): FetchEmployeesSuccessAction => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: data
  };
}

export const fetchEmployeesError: ActionCreator<FetchEmployeesErrorAction> = (error: string): FetchEmployeesErrorAction => {
  return {
    type: FETCH_EMPLOYEES_ERROR,
    payload: error
  };
}

export const createEmployee: ActionCreator<CreateEmployeeAction> = (request: Employee): CreateEmployeeAction => {
  return {
    type: CREATE_EMPLOYEE,
    payload: request
  };
}

export const removeEmployee: ActionCreator<RemoveEmployeeAction> = (id: string): RemoveEmployeeAction => {
  return {
    type: REMOVE_EMPLOYEE,
    payload: id
  };
}

export const searchEmployeeRequest: ActionCreator<SearchEmployeeActionRequest> = (request: string): SearchEmployeeActionRequest => {
  return {
    type: SEARCH_EMPLOYEE_REQUEST,
    payload: request
  };
}

export const searchEmployeeSuccess: ActionCreator<SearchEmployeeActionSuccess> = (data: Employee): SearchEmployeeActionSuccess => {
  return {
    type: SEARCH_EMPLOYEE_SUCCESS,
    payload: data
  };
}

export const searchEmployeeError: ActionCreator<SearchEmployeeActionError> = (error: string): SearchEmployeeActionError => {
  return {
    type: SEARCH_EMPLOYEE_ERROR,
    payload: error
  };
}
