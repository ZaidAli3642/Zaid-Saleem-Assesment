import React from 'react'
import { Button as MUButton } from '@mui/material'

const Button = ({ type = 'submit', onClick, title }) => {
  return (
    <MUButton type={type} onClick={onClick}>
      {title}
    </MUButton>
  )
}

export default Button
