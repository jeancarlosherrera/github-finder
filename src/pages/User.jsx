import { useContext, useEffect } from 'react'
import GitHubContext from '../context/github/GitHubContext'
import { useParams } from 'react-router-dom'

const User = () => {
  const { getUser, selectedUserFromContext } = useContext(GitHubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  return <h1>{selectedUserFromContext.login}</h1>
}

export default User
