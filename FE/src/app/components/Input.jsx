import React from 'react'
import { TextField } from '@mui/material'

const Input = ({ value, placeholder, onChange, type = 'text', name, helperText = '', error = false, ...props }) => {
  return <TextField value={value} placeholder={placeholder} onChange={onChange} type={type} name={name} error={error} helperText={helperText} FormHelperTextProps={{ style: { marginLeft: '5px', fontSize: '12px', color: 'red' } }} {...props} />
}

export default Input
