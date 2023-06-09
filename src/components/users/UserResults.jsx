import { useContext } from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GitHubContext from '../../context/github/GitHubContext'

const UserResults = () => {
  const { usersFromContext, isLoadingFromContext } = useContext(GitHubContext)

  if (!isLoadingFromContext) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {usersFromContext.map((user) => (
          <UserItem key={user.id} userProp={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
