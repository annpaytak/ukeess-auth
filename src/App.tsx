import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'

import { Form as NewEmployeeForm } from './CreateEmployee'
import { Table as EmployeesTable } from './EmployeesTable'
import { Signin } from './Auth'

import './App.scss'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NewEmployeeForm />
          <div className="main-part-wrapper">
            <Signin />
            <EmployeesTable />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
