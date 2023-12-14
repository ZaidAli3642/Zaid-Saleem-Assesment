import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

import { errorConfig, successConfig } from '../../config/toast'
import { errorMessage } from '../../utils/error'
import { failed, register as registerAction, login as loginAction, updateUser as updateUserAction, success } from '../reducers/auth'
import auth from '../../api/auth'

function* register(action) {
  try {
    const { data } = action.payload

    const response = yield call(auth().register, data)
    const { token, user } = response

    yield put(success({ userInfo: user, token }))

    toast('Congrats! you are logged in', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(failed({ error }))
  }
}

function* login(action) {
  try {
    const { data } = action.payload

    const response = yield call(auth().login, data)
    const { token, user } = response

    yield put(success({ userInfo: user, token }))

    toast('Congrats! you are logged in', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(failed({ error }))
  }
}

function* updateUser(action) {
  const authToken = yield select(state => state.auth.token)
  try {
    const { data, user_id } = action.payload

    const response = yield call(auth(authToken).updateUser, data, user_id)
    console.log('user not authenticated : ', response)
    const { token, user } = response

    yield put(success({ userInfo: user, token }))

    toast('Congrats! Your changes are updated', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(failed({ error }))
  }
}

export function* authSaga() {
  yield takeEvery(registerAction.type, register)
  yield takeEvery(loginAction.type, login)
  yield takeEvery(updateUserAction.type, updateUser)
}
