import gql from "graphql-tag";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../constants";

/**
 * Note the different syntax for doing string interpolation
 * inside of a graphQL query.
 *
 * Important: we should never do string interpolation to construct
 * queries from user-supplied values.
 * Instead we can use variables, as we did for the productId.
 * More info: https://shopify.dev/concepts/graphql/variables
 */
export const GET_PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($productId: ID!) {
    product(id: $productId) {
      id
      title
      featuredImage {
        id
        originalSrc
      }
      avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.avgRating}"
      ) {
        id
        value
      }
      camera_avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.camera_avgRating}"
      ) {
        id
        value
      }
      display_avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.display_avgRating}"
      ) {
        id
        value
      }
      battery_avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.battery_avgRating}"
      ) {
        id
        value
      }
      vfm_avgRatingMetafield: metafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.vfm_avgRating}"
      ) {
        id
        value
      }
    }
  }
`;
