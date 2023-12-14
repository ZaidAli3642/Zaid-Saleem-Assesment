import { FormControl } from '@mui/material'
import React from 'react'

const Form = ({ children, onSubmit, fullWidth = true, isInvalid = false }) => {
  return (
    <FormControl fullWidth={fullWidth} error={isInvalid}>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(e)
        }}
      >
        {children}
      </form>
    </FormControl>
  )
}

export default Form
