import { takeEvery, all } from "@redux-saga/core/effects"// put

//modals if needed

import {
  FetchEmployeesRequestAction, FETCH_EMPLOYEES_REQUEST,
  // FetchEmployeesSuccessAction, FETCH_EMPLOYEES_SUCCESS,
  // FetchEmployeesErrorAction, FETCH_EMPLOYEES_ERROR,

  CreateEmployeeAction, CREATE_EMPLOYEE,
  RemoveEmployeeAction, REMOVE_EMPLOYEE
  // CreateEmployeeSuccessAction, CREATE_EMPLOYEE_SUCCESS,
  // CreateEmployeeErrorAction, CREATE_EMPLOYEE_ERROR

  // UserSignupRequestAction, USER_SIGNUP_REQUEST,
  // UserSignupSuccessAction, USER_SIGNUP_SUCCESS,
  // UserSigninRequestAction, USER_SIGNIN_REQUEST,
  // UserSigninSuccessAction, USER_SIGNIN_SUCCESS,
  // UserSignoutRequestAction, USER_SIGNOUT_REQUEST,
  // UserSignoutSuccessAction, USER_SIGNOUT_SUCCESS,
} from './types'

import { EmployeesService } from '../services/employees.service'

// React on user signup request => processing signup
async function onFetchEmployeesRequest(action: FetchEmployeesRequestAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.fetch();//action.payload
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchEmployeesRequest() {
  yield takeEvery(FETCH_EMPLOYEES_REQUEST, onFetchEmployeesRequest);
}

// React on user signup request => processing signup
async function onCreateEmployee(action: CreateEmployeeAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.create(action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* watchCreateEmployee() {
  yield takeEvery(CREATE_EMPLOYEE, onCreateEmployee);
}

// React on user signup request => processing signup
async function onRemoveEmployee(action: RemoveEmployeeAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.remove(action.payload);
  } catch (error) {
    console.log(error);
  }
}

function* watchRemoveEmployee() {
  yield takeEvery(REMOVE_EMPLOYEE, onRemoveEmployee);
}

// // React on user signin request => processing signin
// async function onUserSigninRequest(action: UserSigninRequestAction): Promise<void> {
//   try {
//     console.log(action.payload);
//   } catch (error) {
//     console.log(error);
//   } 
// }

// function* watchUserSigninRequest() {
//   yield takeEvery(USER_SIGNIN_REQUEST, onUserSigninRequest);
// }

// // React on user signout request => processing signout
// async function onUserSignoutRequest(action: UserSigninRequestAction): Promise<void> {
//   try {
//     console.log(action.payload);
//   } catch (error) {
//     console.log(error);
//   } 
// }

// function* watchUserSignoutRequest() {
//   yield takeEvery(USER_SIGNOUT_REQUEST, onUserSignoutRequest);
// }

// function* onUserSignupSuccess() {
//   // yield put(fn);
// }

// function* watchUserSignupSuccess() {
//   yield takeEvery(USER_SIGNUP_SUCCESS, onUserSignupSuccess);
// }

// function* onUserSigninSuccess() {
//   // yield put(fn);
// }

// function* watchUserSigninSuccess() {
//   yield takeEvery(USER_SIGNIN_SUCCESS, onUserSigninSuccess);
// }

// function* onUserSignoutSuccess() {
//   // yield put(fn);
// }

// function* watchUserSignoutSuccess() {
//   yield takeEvery(USER_SIGNOUT_SUCCESS, onUserSignoutSuccess);
// }

export function* fetchSaga() {
  yield all([
    watchFetchEmployeesRequest(),
    watchCreateEmployee(),
    watchRemoveEmployee(),
    // watchUserSignupSuccess(),
    // watchUserSigninSuccess(),
    // watchUserSignoutSuccess(),
  ])
}
