import "isomorphic-fetch";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../../../constants";
import { gql } from "apollo-boost";

const PRIVATE_METAFIELD_UPSERT = gql`
  mutation PrivateMetafieldUpsert($input: PrivateMetafieldInput!) {
    privateMetafieldUpsert(input: $input) {
      privateMetafield {
        id
        key
        value
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const updateProductCameraRatings = async (
  client,
  productGid,
  camera_ratings
) => {
  await client.mutate({
    mutation: PRIVATE_METAFIELD_UPSERT,
    variables: {
      input: {
        owner: productGid,
        key: METAFIELD_KEY.camera_ratings,
        namespace: METAFIELD_NAMESPACE.general,
        valueInput: {
          value: JSON.stringify(camera_ratings),
          valueType: "JSON_STRING",
        },
      },
    },
  });
};
