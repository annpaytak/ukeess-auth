import { Reducer } from 'redux'

import {
  EmployeeState, EmployeeActionTypes,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,

  // CREATE_EMPLOYEE_REQUEST,
  // CREATE_EMPLOYEE_SUCCESS,
  // CREATE_EMPLOYEE_ERROR
  CREATE_EMPLOYEE,
  REMOVE_EMPLOYEE
} from './types'

const initialState: EmployeeState = {
  employee: null,
  data: [],
  fetchLoading: false,
  id: undefined
}

export const employeeReducer: Reducer<EmployeeState, EmployeeActionTypes> = (state: EmployeeState = initialState, action: EmployeeActionTypes): EmployeeState => {
  console.log(action);
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        fetchLoading: true
      }
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        data: action.payload
      }
    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        fetchLoading: false,
        // Also payload is type string with error message so we can use it to show message to user
      }
    case CREATE_EMPLOYEE:
      return {
        ...state,
        employee: action.payload
      }
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        id: action.payload
        // Also payload is type string with error message so we can use it to show message to user
      }
    default:
      return state;
  }
}
