import gql from "graphql-tag";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../constants";

/**
 * This query is used to find which products have at least one
 * published OR unpublished review.
 *
 * We also use aliases to change how some property names are returned.
 * This allows us to differentiate between the types of metafields in our code
 * More info: https://graphql.org/learn/queries/#aliases
 */
export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($query: String) {
    products(first: 110, query: $query) {
      edges {
        node {
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
          publicReviews: metafields(
            first: 1,
            namespace: "${METAFIELD_NAMESPACE.publicReviews}"
          ) {
            edges {
              node {
                id
              }
            }
          }
          privateReviews: metafields(
            first: 1,
            namespace: "${METAFIELD_NAMESPACE.privateReviews}"
          ) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
