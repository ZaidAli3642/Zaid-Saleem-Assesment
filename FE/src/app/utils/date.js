export const postTime = timestamp => {
  const date = new Date(timestamp)

  // Options for formatting the date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  // Formatting the date to the desired format
  return date.toLocaleDateString('en-US', options)
}
