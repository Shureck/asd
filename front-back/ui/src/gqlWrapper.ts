import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:5000/graphql"
  })
});

async function rejectOnError<T>(promise: Promise<ApolloQueryResult<T> | FetchResult<T>>): Promise<T> {
  return new Promise<T>(
    (resolve, reject): void => {
      promise
        .then(value => {
          if (value.errors) {
            value.errors.forEach((error: any) => {
              console.error('PostGraphile error', error);
            });
            reject(value.errors[0].message);
          } else {
            resolve(value.data === null ? undefined : value.data);
          }
        })
        .catch(reject);
    },
  );
}


function extractKeys(obj: IObjectWithIndex, extractKeysLevel: number | boolean): any {
  extractKeysLevel = typeof extractKeysLevel === 'boolean' ? 1 : extractKeysLevel;

  let ret = obj;
  for (let i = 1; i <= extractKeysLevel; i++) {
    const keys = Object.keys(ret).filter(key => key !== "__typename");
    if (keys.length > 1) {
      throw new Error(`Multiple key in query answer at level ${i}`);
    }

    if (keys.length === 0) {
      throw new Error(`No keys in query answer at level ${i}`);
    }

    ret = ret[keys[0]];
  }

  return ret;
}

export async function query<T>(queryBody: string | any, extractKeysLevel: boolean | number = false): Promise<T> {
  if (typeof queryBody === 'string') {
    queryBody = gql(queryBody);
  }

  let ret = rejectOnError<T>(
    apolloClient.query({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      query: queryBody,
    }),
  );
  if (extractKeysLevel) {
    ret = ret.then((value => extractKeys(value, extractKeysLevel)));
  }

  return ret;
}

export async function mutate<T>(mutationBody: string | any, extractKeysLevel: boolean | number = false): Promise<T> {
  if (typeof mutationBody === 'string') {
    mutationBody = gql(mutationBody);
  }

  let ret = rejectOnError<T>(
    apolloClient.mutate({
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      mutation: mutationBody,
    }),
  );
  if (extractKeysLevel) {
    ret = ret.then((value => extractKeys(value, extractKeysLevel)));
  }

  return ret;
}
