import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:7000/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4MTIzYzExLTA2YTEtNGI3NC05OGVjLTExZjU1ODZmZmZiOSIsImVtYWlsIjoidGVzdGVtYWlsQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkRlbnlzIiwibGFzdE5hbWUiOiJCYWRha2EiLCJjaXRpZXMiOltdLCJpYXQiOjE2OTU5NzQ0OTIsImV4cCI6MTY5NjA2MDg5Mn0.B5ZnMBHWFyQSVzMBw0I7m9T3Qc6y1BjMl60flOAzQv8',
  },
});

export default client;
