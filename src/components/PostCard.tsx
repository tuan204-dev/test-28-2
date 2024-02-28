import { IPost } from '../types'
import { IoClose } from 'react-icons/io5'

interface PostCardProps extends IPost {
  onDelete?: () => void
}

const PostCard: React.FC<PostCardProps> = ({ author, content, title, onDelete }) => {
  return (
    <div className="flex flex-col py-2 px-3 rounded-md shadow-md relative">
      <button onClick={onDelete} className="absolute top-3 right-3">
        <IoClose />
      </button>

      <h2 className="font-bold text-lg">{title}</h2>
      <span>{author}</span>
      <p>{content}</p>
    </div>
  )
}

export default PostCard
