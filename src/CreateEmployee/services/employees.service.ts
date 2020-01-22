// import axios, { AxiosResponse } from 'axios'

import { employeesRef as ref, fb, database } from '../../config'

import store from '../../store'

// TODO: fix
// @firebase/app: 
//     Warning: Firebase is already defined in the global scope. Please make sure
//     Firebase library is only loaded once.

import {
  // fetchEmployeesRequest,
  fetchEmployeesSuccess,
  fetchEmployeesError,
  createEmployee,
  removeEmployee,
  // fetchPackTypesSuccess,
  // fetchPackTypesError,
  // fetchBoosterTypesSuccess,
  // fetchBoosterTypesError,
  // fetchBundleTypesSuccess,
  // fetchBundleTypesError,
  // createOrderRequestSuccess,
  // createOrderRequestFailure
} from '../store/actions'

import { Employee } from '../models/employee';
import { userSigninSuccess, userSignoutSuccess } from '../../Auth';
// import { ApiResponse, PackType, BoosterType, BundleType } from '../../Shared';
// import { OrderToCreate } from '../models/order-to-create';
// import { GiftCardInfo } from '../models/gift-card-info';

export class EmployeesService {
  // private apiBaseUrl: string;

  // constructor() {
  // this.apiBaseUrl = Config.environment.api.baseUrl;
  // }

  public async fetchPerPage() {
    var first = database.collection("employees")
      .orderBy("name")
      .limit(5);
    console.log(await database.collection("employees"));
    console.log(database.collection("employee"));

    return first.get().then((documentSnapshots) => {
      // Get the last visible document
      var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible);
      console.log(documentSnapshots);
      console.log(database.collection("employees"));

      // Construct a new query starting at this document,
      // get the next 25 cities.
      // var next = db.collection("cities")
      //   .orderBy("population")
      //   .startAfter(lastVisible)
      //   .limit(25);
    });

    // var beaconsRef = database.collection('employees');
    // // Create a query against the collection
    // var queryRef = beaconsRef.where('employee_id', '==', beacon.id);
    // database.collection("employees")
    //   .doc(user.uid)
    //   .set(this.fetchPerPage, { merge: true });
  }

  signInGoogle() {
    var provider = new fb.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    fb.auth().signInWithPopup(provider).then((result: any) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      store.dispatch(userSigninSuccess(user.displayName));
      this.fetchPerPage();
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signOut() {
    fb.auth().signOut().then(() => {
      // Sign-out successful.
      store.dispatch(userSignoutSuccess());
    }).catch(function (error) {
      // An error happened.
    });
  }

  private gotData(data: any) {
    let items = data.val();
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

    // console.log(data.val());
    // console.log(newState);

    if (newState)
      store.dispatch(fetchEmployeesSuccess(newState));
  }

  private errData(error: any) {
    console.error(`Error: ${error}`);
  }

  public async fetch(): Promise<any> {
    // console.log('fetch');
    try {
      ref.on('value', this.gotData, this.errData);

      // const url: string = `${this.apiBaseUrl}/items/packs/`;
      // const response: AxiosResponse<ApiResponse> = await axios.get(url);
      // const apiResponse: ApiResponse = response.data as ApiResponse;

      // if (!apiResponse.success) {
      //   store.dispatch(fetchPackTypesError(apiResponse.message));
      //   return;
      // }

      // let packTypes: PackType[] = apiResponse.data as PackType[];

      // // WARNING: Temporary fix
      // packTypes = packTypes.filter(pt => pt.price > 0);

      // store.dispatch(fetchPackTypesSuccess(packTypes));
    } catch (error) {
      store.dispatch(fetchEmployeesError());
      console.log(error);
      // this.handleApiError(error, (e: string) => { store.dispatch(fetchPackTypesError(e)) })
    }
  }

  // public async fetchBoosterTypes(): Promise<any> {
  //   try {
  //     const url: string = `${this.apiBaseUrl}/items/boosters/`;
  //     const response: AxiosResponse<ApiResponse> = await axios.get(url);
  //     const apiResponse: ApiResponse = response.data as ApiResponse;

  //     if (!apiResponse.success) {
  //       store.dispatch(fetchBoosterTypesError(apiResponse.message));
  //       return;
  //     }

  //     const boosterTypes: BoosterType[] = apiResponse.data as BoosterType[];
  //     store.dispatch(fetchBoosterTypesSuccess(boosterTypes));
  //   } catch (error) {
  //     this.handleApiError(error, (e: string) => { store.dispatch(fetchBoosterTypesError(e)) })
  //   }
  // }

  // public async fetchBundleTypes(): Promise<any> {
  //   try {
  //     const url: string = `${this.apiBaseUrl}/items/bundles/`;
  //     const response: AxiosResponse<ApiResponse> = await axios.get(url);
  //     const apiResponse: ApiResponse = response.data as ApiResponse;

  //     if (!apiResponse.success) {
  //       store.dispatch(fetchBundleTypesError(apiResponse.message));
  //       return;
  //     }

  //     const bundleTypes: BundleType[] = apiResponse.data as BundleType[];
  //     store.dispatch(fetchBundleTypesSuccess(bundleTypes));
  //   } catch (error) {
  //     this.handleApiError(error, (e: string) => { store.dispatch(fetchBundleTypesError(e)) })
  //   }
  // }

  public async remove(id: string): Promise<any> {
    ref.child(id).remove()
      .then(function () {
        store.dispatch(removeEmployee());
        // console.log("Remove succeeded.")
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }

  public async create(employeeToCreate: Employee): Promise<any> {
    try {
      // console.log(employeeToCreate);
      // A post entry.
      var employeeData = {
        name: employeeToCreate.name,
        company: employeeToCreate.company,
        position: employeeToCreate.position,
        dateOfHire: employeeToCreate.dateOfHire,
      };

      // Get a key for a new Post.
      // var newPostKey = firebase.database().ref().child('employees').push().key;
      var newPostKey = ref.push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates: any = {};
      updates[`${newPostKey}`] = employeeData;

      store.dispatch(createEmployee());

      return ref.update(updates);

    } catch (error) {
      // store.dispatch(createEmployeeError());
      console.log(error);
    }
  }

  // // Returns OrderId
  // public async createOrder(orderToCreate: OrderToCreate): Promise<string> {
  //   try {
  //     const url: string = `${this.apiBaseUrl}/orders/create/`;
  //     const body: any = {
  //       order: orderToCreate
  //     }
  //     console.log(body)
  //     const response: AxiosResponse<ApiResponse> = await axios.post(url, body);
  //     const apiResponse: ApiResponse = response.data as ApiResponse;
  //     const responseData = apiResponse.data;

  //     if (!apiResponse.success) {
  //       store.dispatch(createOrderRequestFailure(apiResponse.message));
  //       return undefined;
  //     }

  //     store.dispatch(createOrderRequestSuccess());

  //     console.log(apiResponse)

  //     // alert(apiResponse.message);

  //     return responseData.id;
  //   } catch (error) {
  //     this.handleApiError(error, (e: string) => { store.dispatch(createOrderRequestFailure(e)) })
  //   }
  // }

  // public async getGiftCardInfo(code: string): Promise<GiftCardInfo> {
  //   try {
  //     const url: string = `${this.apiBaseUrl}/items/giftcards?code=${code}`;
  //     const response: AxiosResponse<ApiResponse> = await axios.get(url);
  //     const apiResponse: ApiResponse = response.data as ApiResponse;
  //     const cardInfo: GiftCardInfo = apiResponse.data as GiftCardInfo;

  //     console.log(apiResponse)

  //     return cardInfo;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // private async handleApiError(error: any, cb: Function) {
  //   console.log('[ShopService]: ', error);
  //   if (error.response && error.response.data) {
  //     const apiResponse: ApiResponse = error.response.data;
  //     if (apiResponse.message) {
  //       const errorMessage: string = apiResponse.message;
  //       cb(errorMessage);
  //     }
  //   }
  // }
}