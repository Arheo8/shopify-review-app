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

export const updateProductDisplayRatings = async (
  client,
  productGid,
  display_ratings
) => {
  await client.mutate({
    mutation: PRIVATE_METAFIELD_UPSERT,
    variables: {
      input: {
        owner: productGid,
        key: METAFIELD_KEY.display_ratings,
        namespace: METAFIELD_NAMESPACE.general,
        valueInput: {
          value: JSON.stringify(display_ratings),
          valueType: "JSON_STRING",
        },
      },
    },
  });
};
