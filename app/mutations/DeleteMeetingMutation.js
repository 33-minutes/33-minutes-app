import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'
import uuid from 'uuid/v4';

const mutation = graphql`
  mutation DeleteMeetingMutation($input: deleteMeetingInput!) {
    deleteMeeting(input: $input) {
      clientMutationId,
      deletedId
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
    variables,
    configs: [{
      type: 'NODE_DELETE',
      parentID: userId,
      deletedIDFieldName: 'deletedId',
      connectionName: 'MeetingsList_meetings'
    }]
  })
}

export default {
  commit
}