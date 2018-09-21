import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(
  'https://api.graph.cool/simple/v1/cjajfcvlo1v4y01008dewonj1'
);

export default client;

export const gql = String.raw;
