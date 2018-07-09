import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'

const mutation = graphql`
  mutation CreateMeetingMutation($input: createMeetingInput!) {
    createMeeting(input: $input) {
      meeting {
        id
        title
        started
        finished
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