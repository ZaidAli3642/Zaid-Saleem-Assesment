import React from 'react'
import { Card, CardContent, CardHeader, IconButton, Avatar, Typography, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

import { postTime } from '../utils/date'

const Post = ({ data, userInfo, onEditPost, onDeletePost }) => {
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
    user: { name, color, id },
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
          userInfo.id === id ? (
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
                <MenuItem
                  onClick={() => {
                    onEditPost(data)
                    handleClose()
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDeletePost(data)
                    handleClose()
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </IconButton>
          ) : null
        }
        title={name}
        subheader={postTime(updated_at)}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Post
