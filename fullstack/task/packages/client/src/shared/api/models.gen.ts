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
  DateTime: { input: any; output: any; }
};

export type CreateExampleInputType = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Example = {
  __typename?: 'Example';
  createdAtUtc: Scalars['DateTime']['output'];
  deleteDateUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAtUtc?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  amount: Scalars['Float']['output'];
  code: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAtUtc: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  deleteDateUtc?: Maybe<Scalars['DateTime']['output']>;
  fetchedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rate: Scalars['Float']['output'];
  updatedAtUtc?: Maybe<Scalars['DateTime']['output']>;
  version: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExample: Example;
};


export type MutationCreateExampleArgs = {
  data: CreateExampleInputType;
};

export type Query = {
  __typename?: 'Query';
  exampleByName?: Maybe<Example>;
  exchangeRates: Array<ExchangeRate>;
};


export type QueryExampleByNameArgs = {
  name: Scalars['String']['input'];
};
