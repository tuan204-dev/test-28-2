'use client'

import PostCard from '@/components/PostCard'
import PostService from '@/services/PostService'
import { IPost } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '@/schema'
import CreateForm from '@/components/CreateForm'

export interface PostListForm {
  postList: IPost[]
}

export default function Home() {
  const form = useForm<PostListForm>({
    defaultValues: {
      postList: [],
    },
    resolver: yupResolver(schema),
  })

  const { remove } = useFieldArray({
    control: form.control,
    name: 'postList',
  })

  const { postList } = form.watch()

  const fetchInitData = useCallback(async () => {
    const initPostList = await PostService.getPost()
    form.reset({ postList: initPostList })
  }, [])

  useEffect(() => {
    fetchInitData()
  }, [])

  const handleDeletePost = useCallback((idx: number) => {
    remove(idx)
  }, [])

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-y-3 max-w-[500px] mx-auto">
        {postList.map((post, idx) => (
          <PostCard
            key={idx}
            title={post.title}
            author={post.author}
            content={post.content}
            onDelete={() => handleDeletePost(idx)}
          />
        ))}
      </div>
      <CreateForm />
    </FormProvider>
  )
}
