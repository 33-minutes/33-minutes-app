import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'

const mutation = graphql`
  mutation LoginMutation($input: loginInput!) {
    login(input: $input) {
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