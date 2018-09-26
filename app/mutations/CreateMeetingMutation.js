import { graphql } from 'react-relay';
import commitMutation from 'relay-commit-mutation-promise';
import uuid from 'uuid/v4';

const mutation = graphql`
  mutation CreateMeetingMutation($input: createMeetingInput!) {
    createMeeting(input: $input) {
      clientMutationId,
      meeting {
        id
        title
        started
        finished
        location
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
      type: 'RANGE_ADD',
      parentID: userId,
      connectionInfo: [{
        key: 'MeetingsList_meetings',
        rangeBehavior: 'prepend',
      }],
      edgeName: 'meetingEdge'
    }]
  })
}

export default {
  commit
}