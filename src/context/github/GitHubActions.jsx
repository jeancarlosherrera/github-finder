//Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const res = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`
  )
  const { items } = await res.json()

  return items
}
