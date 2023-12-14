import { all } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { feedSaga } from './feedSaga'

export function* rootSaga() {
  yield all([authSaga(), feedSaga()])
}
