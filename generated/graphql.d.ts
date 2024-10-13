export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<RegisterResponse>;
  login?: Maybe<LoginResponse>;
};


export type MutationCreateAccountArgs = {
  credentials: Credentials;
};


export type MutationLoginArgs = {
  credentials: LoginCredentials;
};

export type PageArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Pagination = {
  __typename?: 'Pagination';
  hasMore: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<UserResponse>;
  getUsers?: Maybe<UserList>;
  implicitLogin?: Maybe<ImplicitLoginResponse>;
  test?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryGetUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUsersArgs = {
  pageArgs?: InputMaybe<PageArgs>;
  userArgs?: InputMaybe<UserArgs>;
};


export type QueryTestArgs = {
  bool: Scalars['Boolean']['input'];
};

export type UserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserList = {
  __typename?: 'UserList';
  nodes?: Maybe<Array<UserResponse>>;
  pagination: Pagination;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type Credentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ImplicitLoginResponse = {
  __typename?: 'implicitLoginResponse';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  loggedIn: Scalars['Boolean']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type LoginCredentials = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'loginResponse';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type RegisterResponse = {
  __typename?: 'registerResponse';
  message: Scalars['String']['output'];
};
