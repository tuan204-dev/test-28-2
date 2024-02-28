import { PostListForm } from '@/app/page'
import { postSchema } from '@/schema'
import { IPost } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'

const CreateForm = () => {
  const { control } = useFormContext<PostListForm>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IPost>({
    defaultValues: {},
    resolver: yupResolver(postSchema),
  })

  const { prepend } = useFieldArray({
    control,
    name: 'postList',
  })

  const onSubmit = useCallback((data: IPost) => {
    prepend(data)
    reset()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 shadow-sm p-5 rounded-md md:max-w-[400px] bg-slate-50"
    >
      <label>Title</label>
      <input
        type="text"
        {...register('title')}
        className="border-gray-200 border-[1px] rounded-sm"
      />
      {errors.title && (
        <span className="text-sm text-red-600">{errors.title.message}</span>
      )}
      <label>Author</label>
      <input
        type="text"
        {...register('author')}
        className="border-gray-200 border-[1px] rounded-sm"
      />
      {errors.author && (
        <span className="text-sm text-red-600">{errors.author.message}</span>
      )}
      <label>Content</label>
      <input
        type="text"
        {...register('content')}
        className="border-gray-200 border-[1px] rounded-sm"
      />
      {errors.content && (
        <span className="text-sm text-red-600">{errors.content.message}</span>
      )}
      <button className='bg-slate-500 px-4 py-2 rounded-lg uppercase text-white font-semibold'>Post</button>
    </form>
  )
}

export default CreateForm
