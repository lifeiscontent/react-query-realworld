export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string;
}

export interface Author {
  bio: string | null;
  following: boolean;
  image: string;
  username: string;
}

export interface Article {
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface Profile {
  bio: string | null;
  following: boolean;
  image: string;
  username: string;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
