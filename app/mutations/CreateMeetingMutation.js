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
      },
      meetingEdge {
        node {
          id
        }
      }
    }
  }
`

function commit(userId, { environment, input }) {
  const variables = { input }

  return commitMutation(environment, {
    mutation,
    variables,
    configs: [{
      type: 'RANGE_ADD',
      parentID: userId,
      connectionInfo: [{
        key: 'Meetings_meetings',
        rangeBehavior: 'append',
      }],
      edgeName: 'meetingEdge'
    }]
  })
}

export default {
  commit
}