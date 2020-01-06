import gql from 'graphql-tag'

export default () => {
  return {
    CreatePost: gql`
      mutation(
        $title: String!
        $content: String!
        $language: String
        $categoryIds: [ID]
        $imageUpload: Upload
        $imageBlurred: Boolean
        $imageAspectRatio: Float
      ) {
        CreatePost(
          title: $title
          content: $content
          language: $language
          categoryIds: $categoryIds
          imageUpload: $imageUpload
          imageBlurred: $imageBlurred
          imageAspectRatio: $imageAspectRatio
        ) {
          title
          slug
          content
          contentExcerpt
          language
          imageBlurred
        }
      }
    `,
    UpdatePost: gql`
      mutation(
        $id: ID!
        $title: String!
        $content: String!
        $language: String
        $imageUpload: Upload
        $categoryIds: [ID]
        $image: String
        $imageBlurred: Boolean
        $imageAspectRatio: Float
      ) {
        UpdatePost(
          id: $id
          title: $title
          content: $content
          language: $language
          imageUpload: $imageUpload
          categoryIds: $categoryIds
          image: $image
          imageBlurred: $imageBlurred
          imageAspectRatio: $imageAspectRatio
        ) {
          id
          title
          slug
          content
          contentExcerpt
          language
          imageBlurred
          pinnedBy {
            id
            name
            role
          }
          imageAspectRatio
        }
      }
    `,
    DeletePost: gql`
      mutation($id: ID!) {
        DeletePost(id: $id) {
          id
        }
      }
    `,
    AddPostEmotionsMutation: gql`
      mutation($to: _PostInput!, $data: _EMOTEDInput!) {
        AddPostEmotions(to: $to, data: $data) {
          emotion
          from {
            id
          }
          to {
            id
          }
        }
      }
    `,
    RemovePostEmotionsMutation: gql`
      mutation($to: _PostInput!, $data: _EMOTEDInput!) {
        RemovePostEmotions(to: $to, data: $data) {
          emotion
          from {
            id
          }
          to {
            id
          }
        }
      }
    `,
    pinPost: gql`
      mutation($id: ID!) {
        pinPost(id: $id) {
          id
          title
          slug
          content
          contentExcerpt
          language
          pinnedBy {
            id
            name
            role
          }
        }
      }
    `,
    unpinPost: gql`
      mutation($id: ID!) {
        unpinPost(id: $id) {
          id
          title
          slug
          content
          contentExcerpt
          language
          pinnedBy {
            id
            name
            role
          }
        }
      }
    `,
  }
}
