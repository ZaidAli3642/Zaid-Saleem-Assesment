import { call, put, select, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'

import { deletePost, deletePostFailed, deletePostSuccess, editPost, editPostFailed, editPostSuccess, fetchPosts, fetchPostsFailed, fetchPostsSuccess, publishPost, publishPostFailed, publishPostSuccess, setIsEdit } from '../reducers/feed'
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

function* modifyPost(action) {
  const { token } = yield select(state => state.auth)
  try {
    const { data, post_id } = action.payload

    const response = yield call(feed(token).editPost, data, post_id)

    yield put(editPostSuccess({ post: response.post }))
    yield put(setIsEdit({ isEdit: false }))
    toast('Congrats! your post is updated.', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(editPostFailed({ error }))
  }
}

function* removePost(action) {
  const { token } = yield select(state => state.auth)
  try {
    const { data, post_id } = action.payload

    yield call(feed(token).deletePost, post_id)

    yield put(deletePostSuccess({ post: data }))

    toast('Congrats! your post is deleted.', successConfig)
  } catch (error) {
    const message = errorMessage(error)

    toast(message, errorConfig)

    yield put(deletePostFailed({ error }))
  }
}

export function* feedSaga() {
  yield takeEvery(publishPost.type, savePost)
  yield takeEvery(fetchPosts.type, getPosts)
  yield takeEvery(editPost.type, modifyPost)
  yield takeEvery(deletePost.type, removePost)
}
