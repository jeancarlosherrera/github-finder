import { useState, useContext } from 'react'
import GitHubContext from '../../context/github/GitHubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GitHubActions'

const UserSearch = () => {
  const [text, setText] = useState('')

  const { usersFromContext, dispatch, clearResults } = useContext(GitHubContext)

  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Please provide a value', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })
      const usersFound = await searchUsers(text)
      dispatch({ type: 'GET_USERS', payload: usersFound })

      setText('')
    }
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {usersFromContext.length > 0 && (
        <div>
          <button onClick={clearResults} className='btn btn-ghost btn-lg'>
            Clear
          </button>{' '}
        </div>
      )}
    </div>
  )
}

export default UserSearch
