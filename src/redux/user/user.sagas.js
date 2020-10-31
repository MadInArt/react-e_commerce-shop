import { takeLatest, put, all, call } from "redux-saga/effects";
import userActions from "./user-constants";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from "./user-action";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* onGoogleSigninStart() {
  yield takeLatest(userActions.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* oncheckUserSession() {
  yield takeLatest(userActions.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onEmailSigninStart() {
  yield takeLatest(userActions.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onSignOutStart() {
  yield takeLatest(userActions.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(oncheckUserSession),
    call(onSignOutStart),
  ]);
}
