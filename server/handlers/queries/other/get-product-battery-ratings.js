import "isomorphic-fetch";
import { gql } from "apollo-boost";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../../../constants";

const GET_PRODUCT_BATTERY_RATINGS = gql`
  query getProductBatteryRatings($productId: ID!) {
    product(id: $productId) {
      battery_ratings: privateMetafield(
        namespace: "${METAFIELD_NAMESPACE.general}",
        key: "${METAFIELD_KEY.battery_ratings}"
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

const getDefaultRatingsObject = () => ({
  1: { weight: 1, total: 0 },
  2: { weight: 2, total: 0 },
  3: { weight: 3, total: 0 },
  4: { weight: 4, total: 0 },
  5: { weight: 5, total: 0 },
});

export const getProductBatteryRatings = async (client, productId) => {
  return client
    .query({
      query: GET_PRODUCT_BATTERY_RATINGS,
      variables: { productId },
    })
    .then((response) => {
      if (response.data.product.battery_ratings) {
        return JSON.parse(response.data.product.battery_ratings.value);
      }
      return getDefaultRatingsObject();
    });
};
