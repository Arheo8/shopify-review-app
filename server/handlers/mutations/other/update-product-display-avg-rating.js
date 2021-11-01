import "isomorphic-fetch";
import { gql } from "apollo-boost";
import {
  METAFIELD_DELETE,
  PRODUCT_METAFIELD_CREATE,
} from "../../../../graphql";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../../../constants";

const GET_PRODUCT_DISPLAY_AVG_RATING_METAFIELD = gql`
  query GetProductDisplayAvgRatingMetafield($productId: ID!) {
    product(id: $productId) {
      display_avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.display_avgRating}"
      ) {
        id
        key
        namespace
        value
        valueType
      }
    }
  }
`;

export const updateProductDisplayAvgRating = async (
  client,
  productId,
  display_avgRating
) => {
  const { data } = await client.query({
    query: GET_PRODUCT_DISPLAY_AVG_RATING_METAFIELD,
    variables: { productId },
  });

  const ogMetafieldId = data?.product?.display_avgRatingMetafield?.id;

  // We skip the original metafield deletion in case it doesn't exist
  if (ogMetafieldId) {
    await client.mutate({
      mutation: METAFIELD_DELETE,
      variables: { input: { id: ogMetafieldId } },
    });
  }

  await client.mutate({
    mutation: PRODUCT_METAFIELD_CREATE,
    variables: {
      input: {
        id: productId,
        metafields: [
          {
            namespace: METAFIELD_NAMESPACE.general,
            key: METAFIELD_KEY.display_avgRating,
            value: String(display_avgRating),
            valueType: "STRING",
          },
        ],
      },
    },
  });
};
