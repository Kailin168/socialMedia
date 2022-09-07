export interface ILike {
  id: number
  post_id: number
  user_id: number
}

export interface IComment {
  id: number
  comment: string
  comment_parents_id: number
  created_at: string
  post_id: number
  user_id: number
}

export interface IPost {
  content: string
  id: number
  i_liked: boolean
  like_count: number
  media?: string | undefined
  updated_at: string
  user_id: number
  likes: ILike[]
  comments: IComment[]
}
