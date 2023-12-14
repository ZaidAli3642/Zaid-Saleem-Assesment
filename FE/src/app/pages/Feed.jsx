import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Send, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

import Post from '../components/Post'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import postSchema from '../validations/postSchema'
import { fetchPosts, publishPost, setIsEdit, editPost as editPostAction, deletePost } from '../redux/reducers/feed'

const Feed = () => {
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ description: '' })
  const [post, setPost] = useState({})
  const { posts, isEditPost } = useSelector(state => state.feed)
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const sendPost = () => {
    onSubmit(postSchema, () => {
      dispatch(publishPost({ data: inputFields }))
    })
  }

  const handleEditPost = post => {
    dispatch(setIsEdit({ isEdit: !isEditPost }))
    setPost(post)
    onChange({ target: { value: post.description, name: 'description' } })
  }

  const editPost = () => {
    onSubmit(postSchema, () => {
      dispatch(editPostAction({ data: inputFields, post_id: post.id }))
    })
  }

  const removePost = post => {
    onSubmit(null, () => {
      dispatch(deletePost({ data: post, post_id: post.id }))
    })
  }

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} width={'100%'}>
      <Box width={'600px'}>
        <Box width={'100%'} display='flex' alignItems={'center'}>
          <Input multiline placeholder={'Something in your mind?'} onChange={onChange} name='description' value={inputFields?.description} error={isInvalid} helperText={errorMessages?.description} />
          <IconButton onClick={isEditPost ? editPost : sendPost} size='small' sx={{ ml: 2, backgroundColor: '#fff', padding: '10px', ':hover': { backgroundColor: '#e6e6e6' } }}>
            {isEditPost ? <Edit /> : <Send />}
          </IconButton>
        </Box>

        {posts?.map(post => (
          <Post data={post} key={post.id} userInfo={userInfo} onEditPost={handleEditPost} onDeletePost={removePost} />
        ))}
      </Box>
    </Box>
  )
}

export default Feed
