import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import './Table.scss'

import { ApplicationState } from '../../../store'
import { fetchEmployeesRequest, removeEmployee } from '../../../CreateEmployee/store/actions'
import { Employee } from '../../../CreateEmployee/models/employee';

// Props from parent (just for ilustration)
interface OwnProps { }

// Props from mapStateToProps
interface StateProps {
  employees: Employee[];
  employeesLoading: boolean;
}

// Props from mapDispatchToProps
interface DispatchProps {
  fetch: () => void;
  remove: (id: string) => void;
}

// Own little state
interface TableContainerState {
  rowsPerPage: number;
  page: number;
  pagesAmount: number;
}

type TableContainerProps = OwnProps & StateProps & DispatchProps;

class Table extends Component<TableContainerProps, TableContainerState> {
  public static defaultProps: TableContainerProps = {
    fetch: () => { },
    remove: () => { },
    employees: [],
    employeesLoading: false
  }

  public readonly state: TableContainerState = {
    rowsPerPage: 5,
    page: 0,
    pagesAmount: 1
  }

  componentDidMount() {
    this.props.fetch();

    setTimeout(() => {
      let div = this.props.employees.length / 5;

      if (Number.isInteger(div)) {
        this.setState({
          pagesAmount: div
        });
      } else {
        this.setState({
          pagesAmount: Number(Math.round(div)) + 1
        });
      }
      
    }, 1 * 1000);
  }

  remove(id: string | undefined) {
    if (id)
      this.props.remove(id)
  }

  handleChangePage = (event: unknown, newPage: number) => {
    // setPage(newPage);
  };

  render() {
    const { employeesLoading, employees } = this.props;
    const { rowsPerPage, page, pagesAmount } = this.state;
    return (
      <div className="table-container">
        {/* <p className="header-text">Employees</p> */}
        {/* <hr /> */}

        <section className="search-wrapper">
          {/* <p className="header-text">Search Employee</p> */}

          <input type="text" placeholder="Name" />
          <button className="outlined-button">search</button>
        </section>

        <section className="table-wrapper">
          {/* <span>edit</span> */}
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

          <footer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}

            <button className="icon-button">
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
              </svg>
            </button>
            <p>{pagesAmount}</p>
            {/* <>{pagesAmount.map((pageNum: number) => (
              <p>{pageNum}</p>
            ))}</> */}
            <button className="icon-button">
              <svg focusable="false" viewBox="0 0 24 24">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
              </svg>
            </button>
            <p>Showing {1}-{rowsPerPage} of {employees.length}</p>
          </footer>
        </section>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetch: () => dispatch(fetchEmployeesRequest()),
    remove: (id: string) => dispatch(removeEmployee(id)),
  }
}

function mapStateToProps(state: ApplicationState, ownProps: OwnProps): StateProps {
  return {
    employees: state.fetch.data,
    employeesLoading: state.fetch.fetchLoading
    // packTypes: state.shop.packTypes,
    // packTypesLoading: state.shop.packTypesLoading,
  }
}

export const TableConnected = connect(mapStateToProps, mapDispatchToProps)(Table);