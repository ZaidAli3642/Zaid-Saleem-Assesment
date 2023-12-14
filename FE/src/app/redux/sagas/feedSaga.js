import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

import { fetchPosts, fetchPostsFailed, fetchPostsSuccess, publishPost, publishPostFailed, publishPostSuccess } from '../reducers/feed'
import { errorMessage } from '../../utils/error'
import { errorConfig, successConfig } from '../../config/toast'
import feed from '../../api/feed'

function* savePost(action) {
  const { token, userInfo } = yield select(state => state.auth)
  try {
    const { data } = action.payload

    const response = yield call(feed(token).savePost, { ...data, user_id: userInfo.id })

    yield put(publishPostSuccess({ post: response.post }))

    toast('Congrats! your post is published.', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(publishPostFailed({ error }))
  }
}

function* getPosts(action) {
  const { token } = yield select(state => state.auth)
  try {
    const response = yield call(feed(token).fetchPosts)

    yield put(fetchPostsSuccess({ posts: response.posts }))
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(fetchPostsFailed({ error }))
  }
}

export function* feedSaga() {
  yield takeEvery(publishPost.type, savePost)
  yield takeEvery(fetchPosts.type, getPosts)
}
