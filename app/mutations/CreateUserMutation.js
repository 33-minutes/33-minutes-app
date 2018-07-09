import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'

const mutation = graphql`
  mutation CreateUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`

function commit({ environment, input }) {
  const variables = { input }

  return commitMutation(environment, {
    mutation,
    variables
  })
}

export default {
  commit
}