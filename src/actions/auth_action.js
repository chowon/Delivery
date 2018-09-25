import firebase from 'firebase';
import {
  LOGGED_IN
} from './types';

export const logInOrSignUp = (email, password) => async dispatch => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGGED_IN, payload: true });
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      signUp(email, password, dispatch);
    } else {
      dispatch({ type: LOGGED_IN, payload: false });
    }
    console.log('login error', err);
  }
};

const signUp = async (email, password, dispatch) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch({ type: LOGGED_IN, payload: true });
  } catch (err) {
    console.log('signUp error', err);
    dispatch({ type: LOGGED_IN, payload: false });
  }
}
