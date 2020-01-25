import { employeesRef as ref } from '../../config'

import store from '../../store'

import {
  fetchEmployeesSuccess,
  fetchEmployeesError,
  createEmployee,
  removeEmployee,
  searchEmployeeSuccess,
} from '../store/actions'

import { Employee } from '../models/employee';

export class EmployeesService {
  private pageSize: number;
  private field: string;

  constructor() {
    this.pageSize = 5;
    this.field = 'name';
  }

  public search = (name: string) => {
    ref
      .orderByChild(this.field)
      .equalTo(name).on("value", (snapshot: any) => {
        snapshot.forEach(function (child: any) {
          store.dispatch(searchEmployeeSuccess(child.val()));
        });
      })
  }

  public nextPage(currentPage: number) {
    let nextPage = currentPage + 1;
    let pageFrom = this.pageSize * currentPage;
    let pageTo = this.pageSize * nextPage;

    ref
      .limitToFirst(pageTo)
      // .endAt(last[this.field]) // anyway not working cause of 'This is a limitation of the underlying Firebase client'
      .once("value", (data: any) => {
        let dataVal = data.val();
        let transformedData = this.transformObjIntoArray(dataVal);
        let nextPageData = transformedData.slice(pageFrom, pageTo + 1);

        store.dispatch(fetchEmployeesSuccess(nextPageData));

        this.showPages(pageFrom, pageTo);
      });
  }

  public prevPage(currentPage: number) {
    const prevPage = currentPage - 1;
    const pageFrom = this.pageSize * (prevPage - 1);
    const pageTo = this.pageSize * currentPage;

    ref
      .limitToFirst(this.pageSize * prevPage)
      .once("value", async (data: any) => {
        let dataVal = data.val();
        let transformedData = this.transformObjIntoArray(dataVal);
        let prevPageData = transformedData.slice(pageFrom, pageTo);

        store.dispatch(fetchEmployeesSuccess(prevPageData));

        this.showPages(pageFrom, pageTo);
      });
  }

  private showPages(from: number, to: number) {
    console.log(`Showing ${from} of ${to}`);
  }

  private transformObjIntoArray(items: any) {
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        company: items[item].company,
        dateOfHire: items[item].dateOfHire,
        name: items[item].name,
        position: items[item].position,
      });
    }
    return newState;
  }

  private gotData = (data: any) => {
    let dataVal = data.val();
    let transformedData = this.transformObjIntoArray(dataVal);

    if (transformedData)
      store.dispatch(fetchEmployeesSuccess(transformedData));
  }

  private errData(error: any) {
    console.error(`Error: ${error}`);
  }

  public async fetch(): Promise<any> {
    try {
      ref.on('value', this.gotData, this.errData);
    } catch (error) {
      store.dispatch(fetchEmployeesError());
      console.error(error);
    }
  }

  public async remove(id: string): Promise<any> {
    ref.child(id).remove()
      .then(function () {
        store.dispatch(removeEmployee());
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  public async create(employeeToCreate: Employee): Promise<any> {
    try {
      var employeeData = {
        name: employeeToCreate.name,
        company: employeeToCreate.company,
        position: employeeToCreate.position,
        dateOfHire: employeeToCreate.dateOfHire,
      };

      var newPostKey = ref.push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates: any = {};
      updates[`${newPostKey}`] = employeeData;

      store.dispatch(createEmployee());

      return ref.update(updates);

    } catch (error) {
      console.error(error);
    }
  }
}