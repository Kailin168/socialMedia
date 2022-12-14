export interface IUser {
  bio: string,
  country: string,
  email: string,
  followee_count: number,
  follower_count: number,
  id: number,
  language: string,
  name: string,
  posts: IPost[],
  liked_posts: IPost[],
  image_url: string,
  username: string,
  i_am_following: boolean,
  created_at: string
}

export const EmptyUserValue = {
  bio: '',
  country: '',
  email: '',
  followee_count: 0,
  follower_count: 0,
  id: -1,
  language: '',
  name: '',
  posts: [],
  liked_posts: [],
  image_url: '',
  username: '',
  i_am_following: false,
  created_at: '',
} as IUser;

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
  user: IUser
}

export interface IPost {
  content: string
  id: number
  i_liked: boolean
  like_count: number
  image_url: string,
  updated_at: string
  user_id: number
  likes: ILike[]
  comments: IComment[]
  user: IUser
}

export interface IMessage {
  id:number;
  user_id:number;
  content:string;
  user: IUser
  created_at: string
}

export interface IChat {
  id:number;
}
