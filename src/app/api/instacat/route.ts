import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
  const url = new URL(request.url)
  const queryString = new URLSearchParams(url.searchParams)
  const postId = queryString.get('postId') || ''
  const postPayload = await fetchPost(postId)
  const commentPayload = postId && await fetchComments(postId)
  const generatePhotoUrl = { imgUrl: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' }
  const payload = Object.assign(postPayload, commentPayload, generatePhotoUrl)
  return NextResponse.json(payload);
}

export const fetchPost = async (postId?: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  const { body } = await response.json()
  return { post: body }
}

export const fetchComments = async (postId?: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  const comments = await response.json()
  const formatedComments = comments.map(({postId, email, ...keepPart}: any) => keepPart)
  return { comments: formatedComments }
}
