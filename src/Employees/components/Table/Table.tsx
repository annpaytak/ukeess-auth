import React, { Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Table.scss'

import { ApplicationState } from '../../../store'
import { fetchEmployeesRequest, removeEmployee, searchEmployeeRequest, Employee, EmployeesService } from '../..'

// Props from parent (just for ilustration)
interface OwnProps { }

// Props from mapStateToProps
interface StateProps {
  employees: Employee[];
  employeesLoading: boolean;
  employee: Employee | undefined;
}

// Props from mapDispatchToProps
interface DispatchProps {
  fetchEmployeesRequest: () => void;
  removeEmployee: (id: string) => void;
  searchEmployeeRequest: (name: string) => void
}

// Own little state
interface TableContainerState {
  rowsPerPage: number;
  page: number;
  pagesAmount: number;
  currentPage: number;
  disabledRight: boolean;
  disabledLeft: boolean;
  searchName: string | undefined;
}

type TableContainerProps = OwnProps & StateProps & DispatchProps;

class Table extends Component<TableContainerProps, TableContainerState> {
  public static defaultProps: TableContainerProps = {
    fetchEmployeesRequest: () => { },
    removeEmployee: () => { },
    searchEmployeeRequest: () => { },
    employees: [],
    employeesLoading: false,
    employee: undefined
  }

  public readonly state: TableContainerState = {
    rowsPerPage: 5,
    page: 0,
    pagesAmount: 1,
    currentPage: 1,
    disabledRight: false,
    disabledLeft: false,
    searchName: undefined
  }

  componentDidMount() {
    this.props.fetchEmployeesRequest();
  }

  remove(id: string | undefined) {
    if (id) this.props.removeEmployee(id)
  }

  prevPage = () => {
    const employeesService = new EmployeesService();
    employeesService.prevPage(this.state.currentPage);
    this.setState({
      currentPage: this.state.currentPage - 1,
      disabledLeft: false
    }, () => {
      if (this.state.currentPage === 1) {
        this.setState({ disabledLeft: true });
      }
    });

    if (this.state.disabledRight) this.setState({ disabledRight: false });
  }

  nextPage = () => {
    const employeesService = new EmployeesService();
    employeesService.nextPage(this.state.currentPage);
    this.setState({
      currentPage: this.state.currentPage + 1,
      disabledRight: false
    }, () => {
      if (this.props.employees.length < 5) {
        this.setState({ disabledRight: true });
      }
    });

    if (this.state.disabledLeft) this.setState({ disabledLeft: false });
  }

  search = () => {
    if (this.state.searchName)
      this.props.searchEmployeeRequest(this.state.searchName);
  }

  searchNameHandle = (e: any) => {
    this.setState({ searchName: e.target.value });
  }

  render() {
    const { employeesLoading, employees } = this.props;
    const { rowsPerPage, page, pagesAmount, currentPage, disabledRight, disabledLeft, searchName } = this.state;
    return (
      <div className="table-container">
        <div className="search-wrapper">
          <input value={searchName} onChange={(e) => this.searchNameHandle(e)} type="text" placeholder="Name Surname" />
          <button disabled={!searchName} onClick={() => this.search()} className="outlined-button">search</button>
        </div>

        {this.props.employee ?
          <div className="search-user-wrapper">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
            </svg>
            <div className="user-wrapper">
              <p>{this.props.employee.name}</p>
              <p>
                <span>company:</span>
                <span>{this.props.employee.company}</span></p>
              <p>
                <span>position:</span>
                <span>{this.props.employee.position}</span></p>
              <p>
                <span>date of hire:</span>
                <span>{this.props.employee.dateOfHire}</span></p>
            </div>
          </div> : <></>
        }

        <div className="table-section">
          <h2>Employees</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Hired</th>
                  <th>
                    <p>Remove</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!employeesLoading ? <>{employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee: Employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.company}</td>
                    <td>{employee.position}</td>
                    <td>{employee.dateOfHire}</td>
                    <td>
                      <button onClick={() => this.remove(employee.id)} className="icon-button outlined-button">
                        <svg className="fill-black" viewBox="0 0 40 40">
                          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                        <p>remove</p>
                      </button>
                    </td>
                  </tr>
                ))}</> : null}
              </tbody>
            </table>
          </div>
          
          <footer>
            <button disabled={disabledLeft || currentPage === 1} onClick={() => this.prevPage()} className="icon-button">
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
              </svg>
            </button>
            <p>{currentPage}</p>
            <button disabled={disabledRight} onClick={() => this.nextPage()} className="icon-button">
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
              </svg>
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch:Dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ fetchEmployeesRequest, removeEmployee, searchEmployeeRequest }, dispatch)
  }
}

function mapStateToProps(state: ApplicationState, ownProps: OwnProps): StateProps {
  return {
    employees: state.fetch.data,
    employeesLoading: state.fetch.fetchLoading,
    employee: state.fetch.employee
  }
}

export const TableConnected = connect(mapStateToProps, mapDispatchToProps )(Table);