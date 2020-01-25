import React, { Component, ChangeEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Form.scss'

import { createEmployee } from '../../store/actions'
import { Employee } from '../../models/employee'

import dataConfig from '../../../config/data'

// Props from parent (just for ilustration)
interface OwnProps { }

// Props from mapStateToProps
interface StateProps { }

// Props from mapDispatchToProps
interface DispatchProps {
  create: (employee: Employee) => void;
}

// Own little state
interface FormContainerState {
  name: string,
  company: string,
  position: string,
  dateOfHire: string,
}

type FormContainerProps = OwnProps & StateProps & DispatchProps;

class Form extends Component<FormContainerProps, FormContainerState> {
  public static defaultProps: FormContainerProps = { create: () => { } }
  public readonly state: FormContainerState = {
    name: '',
    company: dataConfig.companies[0],
    position: dataConfig.positions[0],
    dateOfHire: '',
  }

  sendForm = () => {
    const name = this.state.name
    const company = this.state.company;
    const position = this.state.position;
    const dateOfHire = this.state.dateOfHire;

    const employeeToCreate = {
      name: name,
      company: company,
      position: position,
      dateOfHire: dateOfHire
    }

    this.props.create(employeeToCreate);
  }

  handleName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ name: e.target.value });
  }

  handleDateOfHire = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ dateOfHire: e.target.value });
  }

  handleCompany = (e: any) => {
    this.setState({ company: e.target.value });
  }

  handlePosition = (e: any) => {
    this.setState({ position: e.target.value });
  }

  render() {
    const { name, company, position, dateOfHire } = this.state;
    return (
      <div className="form-wrapper">
        <p className="header-text">Create a new employee</p>
        <hr />
        <form action="">
          <input value={name} required
            type="text" placeholder="Name Surname"
            onChange={this.handleName} />

          <select required name="Company"
            value={company} onChange={this.handleCompany}>
            {dataConfig.companies.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>

          <select required name="Position"
            value={position} onChange={this.handlePosition}>
            {dataConfig.positions.map((p, index) => (
              <option key={index} value={p}>{p}</option>
            ))}
          </select>

          <input value={dateOfHire} required
            type="date" name="Hired" id="" max={new Date().toISOString().split("T")[0]}
            onChange={this.handleDateOfHire} />

          <div className="form-actions">
            <input className="outlined-button" type="reset" value="cancel" />
            <button disabled={!name && !company && !position && !dateOfHire} onClick={this.sendForm}
              className="outlined-button">create</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): FormContainerProps {
  return {
    create: (employee: Employee) => dispatch(createEmployee(employee)),
  }
}

export const FormConnected = connect(null, mapDispatchToProps)(Form);