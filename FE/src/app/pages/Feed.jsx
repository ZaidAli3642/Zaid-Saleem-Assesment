import React, { useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

import Post from '../components/Post'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import postSchema from '../validations/postSchema'
import { fetchPosts, publishPost } from '../redux/reducers/feed'

const Feed = () => {
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ description: '' })
  const { posts } = useSelector(state => state.feed)
  const dispatch = useDispatch()

  const sendPost = () => {
    onSubmit(postSchema, () => {
      dispatch(publishPost({ data: inputFields }))
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
          <IconButton onClick={sendPost} size='small' sx={{ ml: 2, backgroundColor: '#fff', padding: '10px', ':hover': { backgroundColor: '#e6e6e6' } }}>
            <Send />
          </IconButton>
        </Box>

        {posts?.map(post => (
          <Post data={post} key={post.id} />
        ))}
      </Box>
    </Box>
  )
}

export default Feed
