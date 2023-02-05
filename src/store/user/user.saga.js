import { takeLatest, all, call, put } from "redux-saga/effects";

import { USER_ACTION_TYPE } from "./user.types";

import { emailSignInStart, googleSignInStart, signInFailed, signInSuccess, signOutFailed, signOutStart, signOutSucess, signUpFailed, signUpSuccess } from "./user.action";
import { getCurruntUser, createUserDocumentFromAuth, signInWithGooglePopup, SignAuthUserWithEmailAndPassword, CreateAuthUserWithEmailAndPassword, SignOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromuserAuth(userAuth, additionalDetails) {

    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);

        console.log(userSnapShot);
        console.log(userSnapShot.data());

        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield CreateAuthUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signOut() {
    try {
        yield call(SignOutUser);
        yield put(signOutSucess());
    } catch (error) {
        yield call(signOutFailed(error));
    }
}

export function* signInwithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromuserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInwithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(SignAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromuserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromuserAuth(user, additionalDetails));
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurruntUser);
        if (!userAuth) return;

        yield call(getSnapshotFromuserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInwithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInwithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}
export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
}