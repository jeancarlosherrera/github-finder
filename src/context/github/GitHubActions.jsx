import axios from 'axios'

const githubRequest = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_URL,
})

//Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const res = await githubRequest.get(`/search/users?${params}`)

  return res.data.items
}

//Get single user
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const [user, repos] = await Promise.all([
    githubRequest.get(`/users/${login}`),
    githubRequest.get(`/users/${login}/repos?${params}`),
  ])

  return { user: user.data, repos: repos.data }
}
