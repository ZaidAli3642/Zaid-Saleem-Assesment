export const errorMessage = error => {
  if (error?.response) return error?.response?.data?.message

  return error.message
}
