import RepoItem from './RepoItem'

const ReposList = ({ reposListProp }) => {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Repositories
        </h2>

        {reposListProp.map((repo) => (
          <RepoItem key={repo.id} repoItemProp={repo} />
        ))}
      </div>
    </div>
  )
}

export default ReposList
