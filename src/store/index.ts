import { createStore, Store, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { authReducer, AuthState, authSaga } from '../Auth'
import { employeeReducer, EmployeeState, fetchSaga } from '../CreateEmployee'
// import rootSaga from '../actions/sagas';
// import rootReducer from './Reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  fetch: employeeReducer
});

export interface ApplicationState {
  auth: AuthState,
  fetch: EmployeeState
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(fetchSaga);

export default store;
