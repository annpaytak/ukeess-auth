import * as firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/app';

import firebaseConfig from "./keys";

firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const employeesRef = databaseRef.child("employees");

export const fb = firebase;

export const auth = firebase.auth();