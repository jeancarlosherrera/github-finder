import { createContext, useState } from 'react'

const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()
    setUsers(data)
    setIsLoading(false)
  }

  return (
    <GitHubContext.Provider value={{ users, isLoading, getUsers }}>
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
