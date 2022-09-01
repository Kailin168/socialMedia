export interface IUser {
  bio: string,
  country: string,
  email: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feed: any[],
  followee_count: number,
  follower_count: number,
  id: number,
  language: string,
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[],
  profile_image: string,
  username: string,
}

export const EmptyUserValue = {
  bio: '',
  country: '',
  email: '',
  feed: [],
  followee_count: 0,
  follower_count: 0,
  id: -1,
  language: '',
  name: '',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: [],
  profile_image: '',
  username: '',
} as IUser;

// age?: number | string
