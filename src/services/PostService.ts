import { IPost } from '@/types'
import axios from 'axios'

const getPost = async () => {
  const { data } = await axios.get<IPost[]>('/data/posts.json')
  return data
}

const PostService = {
  getPost,
}

export default PostService
