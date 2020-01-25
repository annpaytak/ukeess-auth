import { takeEvery, all } from "@redux-saga/core/effects"

//modals for handling errors

import {
  FetchEmployeesRequestAction, FETCH_EMPLOYEES_REQUEST,
  CreateEmployeeAction, CREATE_EMPLOYEE,
  RemoveEmployeeAction, REMOVE_EMPLOYEE,
  SearchEmployeeActionRequest, SEARCH_EMPLOYEE_REQUEST,
} from './types'

import { EmployeesService } from '../services/employees.service'

async function onFetchEmployeesRequest(action: FetchEmployeesRequestAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.fetch();
  } catch (error) {
    console.error(error);
  }
}

function* watchFetchEmployeesRequest() {
  yield takeEvery(FETCH_EMPLOYEES_REQUEST, onFetchEmployeesRequest);
}

async function onCreateEmployee(action: CreateEmployeeAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.create(action.payload);
  } catch (error) {
    console.error(error);
  }
}

function* watchCreateEmployee() {
  yield takeEvery(CREATE_EMPLOYEE, onCreateEmployee);
}

async function onRemoveEmployee(action: RemoveEmployeeAction): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.remove(action.payload);
  } catch (error) {
    console.error(error);
  }
}

function* watchRemoveEmployee() {
  yield takeEvery(REMOVE_EMPLOYEE, onRemoveEmployee);
}

async function onSearchEmployeeRequest(action: SearchEmployeeActionRequest): Promise<void> {
  const employeesService = new EmployeesService();
  try {
    await employeesService.search(action.payload);
  } catch (error) {
    console.error(error);
  }
}

function* watchSearchEmployeeRequest() {
  yield takeEvery(SEARCH_EMPLOYEE_REQUEST, onSearchEmployeeRequest);
}

export function* fetchSaga() {
  yield all([
    watchFetchEmployeesRequest(),
    watchCreateEmployee(),
    watchRemoveEmployee(),
    watchSearchEmployeeRequest()
  ])
}
