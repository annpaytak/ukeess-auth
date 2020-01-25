import { fb } from '../../config'

import store from '../../store'

import { userSigninSuccess, userSignoutSuccess } from '../index';

export class AuthService {
  signInGoogle() {
    var provider = new fb.auth.GoogleAuthProvider();

    fb.auth().signInWithPopup(provider).then((result: any) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      store.dispatch(userSigninSuccess(user.displayName));

    }).catch((error) => {
      console.error(error);
    });
  }

  signOut() {
    fb.auth().signOut().then(() => {
      store.dispatch(userSignoutSuccess());
    }).catch(function (error) {
      console.error(error);
    });
  }
}