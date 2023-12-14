import React from 'react'
import randomColor from 'randomcolor'
import { Card, CardActions, CardContent, CardHeader, IconButton, Avatar, Typography } from '@mui/material'
import { postTime } from '../utils/date'

const Post = ({ data }) => {
  const {
    description,
    updated_at,
    user: { name, color },
  } = data

  return (
    <Card sx={{ minWidth: '600px', margin: '20px 0' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: color }} aria-label='recipe'>
            {name?.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={<IconButton aria-label='settings'>{/* <MoreVertIcon /> */}</IconButton>}
        title={name}
        subheader={postTime(updated_at)}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>{/* <FavoriteIcon /> */}</IconButton>
        <IconButton aria-label='share'>{/* <ShareIcon /> */}</IconButton>
      </CardActions>
    </Card>
  )
}

export default Post
