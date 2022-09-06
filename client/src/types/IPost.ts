export interface ILike {
  id: number
  post_id: number
  user_id: number
}

export interface IPost {
  content: string
  id: number
  like_count: number
  media?: string | undefined
  updated_at: string
  user_id: number
  likes: ILike[]
}
