import * as Yup from 'yup'

export const postSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  content: Yup.string().required('Content is required'),
})

export const schema = Yup.object().shape({
  postList: Yup.array().of(postSchema).required(),
})
