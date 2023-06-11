import { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()
    setUsers(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  if (!isLoading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3 key={user.id}>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
