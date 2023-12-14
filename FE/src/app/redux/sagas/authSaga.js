import { call, put, takeEvery } from 'redux-saga/effects'
import { failed, register as registerAction, success } from '../reducers/auth'
import auth from '../../api/auth'

function* register(action) {
  try {
    const { data } = action.payload

    const response = yield call(auth().register, data)
    const { token, user } = response

    yield put(success({ userInfo: user, token }))
  } catch (error) {
    yield put(failed({ error }))
  }
}

export function* authSaga() {
  yield takeEvery(registerAction.type, register)
}
