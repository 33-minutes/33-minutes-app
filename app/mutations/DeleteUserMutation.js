import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'
import uuid from 'uuid/v4';

const mutation = graphql`
  mutation DeleteUserMutation($input: deleteUserInput!) {
    deleteUser(input: $input) {
      clientMutationId,
      deletedId
    }
  }
`

function commit({ environment, input }) {
  const variables = { 
    input: {
      clientMutationId: uuid(),
      ...input
    } 
  }

  return commitMutation(environment, {
    mutation,
    variables
  })
}

export default {
  commit
}