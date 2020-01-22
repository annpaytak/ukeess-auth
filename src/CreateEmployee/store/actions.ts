
import { ActionCreator } from "redux"

import { Employee } from '../models/employee'

import {
  FetchEmployeesRequestAction, FETCH_EMPLOYEES_REQUEST,
  FetchEmployeesSuccessAction, FETCH_EMPLOYEES_SUCCESS,
  FetchEmployeesErrorAction, FETCH_EMPLOYEES_ERROR,

  // CreateEmployeeRequestAction, CREATE_EMPLOYEE_REQUEST,
  // CreateEmployeeSuccessAction, CREATE_EMPLOYEE_SUCCESS,
  // CreateEmployeeErrorAction, CREATE_EMPLOYEE_ERROR
  CreateEmployeeAction, CREATE_EMPLOYEE,
  RemoveEmployeeAction, REMOVE_EMPLOYEE

} from "./types";

// export const addToDo = newToDo => async dispatch => {
//   todosRef.push().set(newToDo);
// };

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

// export const fetchToDos = () => async dispatch => {
//   todosRef.on("value", snapshot => {
//     dispatch({
//       type: FETCH_TODOS,
//       payload: snapshot.val()
//     });
//   });
// };

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
////////
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


// export const fetchEmployees = () => async (dispatch: Dispatch) => {
//   employeesRef.on('value', snapshot => {
//     let firebaseDataInObj = snapshot.val();
//     if (firebaseDataInObj)
//       dispatch({
//         type: FETCH_EMPLOYEES,
//         payload: Object.values(firebaseDataInObj)
//       });
//   }, errData);
// }

// const errData = (error: any) => {
//   console.error(`Error: ${error}`);
// }

// export const writeNewEmployee = (data: Employee) => {//async (dispatch: Dispatch) =>
//   // A post entry.
//   var employeeData = {
//     name: data.name,
//     company: data.company,
//     position: data.position,
//     dateOfHire: data.dateOfHire,
//   };

//   // Get a key for a new Post.
//   var newPostKey = employeesRef.push().key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates: any = {};
//   updates[`${newPostKey}`] = employeeData;

//   return employeesRef.update(updates);
// }