import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'
import uuid from 'uuid/v4';

const mutation = graphql`
  mutation UpdateMeetingMutation($input: updateMeetingInput!) {
    updateMeeting(input: $input) {
      clientMutationId,
      meeting {
        id
        title
        started
        finished
      }
    }
  }
`

function commit(userId, { environment, input }) {
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