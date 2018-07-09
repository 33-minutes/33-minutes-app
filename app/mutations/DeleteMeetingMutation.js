import { graphql } from 'react-relay'
import commitMutation from 'relay-commit-mutation-promise'

const mutation = graphql`
  mutation DeleteMeetingMutation($input: deleteMeetingInput!) {
    deleteMeeting(input: $input) {
      deletedId
    }
  }
`

function commit(userId, { environment, input }) {
  const variables = { input }

  return commitMutation(environment, {
    mutation,
    variables,
    configs: [{
      type: 'NODE_DELETE',
      parentID: userId,
      deletedIDFieldName: 'deletedId',
      connectionName: 'Meetings_meetings'
    }]
  })
}

export default {
  commit
}