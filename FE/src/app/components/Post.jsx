import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardHeader, IconButton, Avatar, Typography, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { postTime } from '../utils/date'

const Post = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    !anchorEl ? setAnchorEl(event.currentTarget) : setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
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
        action={
          <IconButton onClick={e => handleClick(e)} aria-label='settings'>
            <MoreVert />
            <Menu
              style={{ minWidth: 'max-content' }}
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </IconButton>
        }
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
