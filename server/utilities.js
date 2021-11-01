import crypto from "crypto";
import { merge, sum, sumBy } from "lodash";
import { MESSAGE_TYPE } from "../constants";
import jwt from "jsonwebtoken";

export const verifyAppProxyExtensionSignature = (
  query = {},
  shopifyApiSecret
) => {
  const { signature = "", ...otherQueryParams } = query;

  const input = Object.keys(otherQueryParams)
    .sort()
    .map((key) => {
      const value = otherQueryParams[key];
      return `${key}=${value}`;
    })
    .join("");

  const hmac = crypto
    .createHmac("sha256", shopifyApiSecret)
    .update(input)
    .digest("hex");

  const digest = Buffer.from(hmac, "utf-8");
  const checksum = Buffer.from(signature, "utf-8");

  return (
    digest.length === checksum.length &&
    crypto.timingSafeEqual(digest, checksum)
  );
};

export const verifyPostPurchaseToken = (
  token,
  referenceId,
  shopifyApiSecret
) => {
  const decodedToken = jwt.verify(token, shopifyApiSecret);
  const decodedReferenceId =
    decodedToken.input_data.initialPurchase.referenceId;
  return decodedReferenceId === referenceId;
};

export function calculateProductRatings(messages, oldRatings) {
  const newRatings = merge({}, oldRatings);

  messages.forEach((message) => {
    const {
      value: {
        type,
        data: {
          review_snapshot: { rating },
        },
      },
    } = message;

    if (!rating) return;
    const ratingClass = newRatings[rating];
    const offset = type === MESSAGE_TYPE.reviewPublished ? 1 : -1;
    const newTotal = Math.max(0, ratingClass.total + rating * offset);

    newRatings[rating] = { ...ratingClass, total: newTotal };
  });

  return newRatings;
}

export const calculateWeightedAverageRating = (ratings) => {
  const sumTotals = sumBy(Object.values(ratings), "total");

  if (sumTotals > 0) {
    const newAvgRating =
      sum(Object.values(ratings).map(({ weight, total }) => weight * total)) /
      sumTotals;

    return Math.round(newAvgRating * 10) / 10;
  }

  return 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function calculateProductCameraRatings(messages, oldRatings) {
  const newRatings = merge({}, oldRatings);

  messages.forEach((message) => {
    const {
      value: {
        type,
        data: {
          review_snapshot: { camera_rating },
        },
      },
    } = message;

    if (!camera_rating) return;
    const ratingClass = newRatings[camera_rating];
    const offset = type === MESSAGE_TYPE.reviewPublished ? 1 : -1;
    const newTotal = Math.max(0, ratingClass.total + camera_rating * offset);

    newRatings[camera_rating] = { ...ratingClass, total: newTotal };
  });

  return newRatings;
}
export function calculateProductDisplayRatings(messages, oldRatings) {
  const newRatings = merge({}, oldRatings);

  messages.forEach((message) => {
    const {
      value: {
        type,
        data: {
          review_snapshot: { display_rating },
        },
      },
    } = message;

    if (!display_rating) return;
    const ratingClass = newRatings[display_rating];
    const offset = type === MESSAGE_TYPE.reviewPublished ? 1 : -1;
    const newTotal = Math.max(0, ratingClass.total + display_rating * offset);

    newRatings[display_rating] = { ...ratingClass, total: newTotal };
  });

  return newRatings;
}
export function calculateProductBatteryRatings(messages, oldRatings) {
  const newRatings = merge({}, oldRatings);

  messages.forEach((message) => {
    const {
      value: {
        type,
        data: {
          review_snapshot: { battery_rating },
        },
      },
    } = message;

    if (!battery_rating) return;
    const ratingClass = newRatings[battery_rating];
    const offset = type === MESSAGE_TYPE.reviewPublished ? 1 : -1;
    const newTotal = Math.max(0, ratingClass.total + battery_rating * offset);

    newRatings[battery_rating] = { ...ratingClass, total: newTotal };
  });

  return newRatings;
}
export function calculateProductVFMRatings(messages, oldRatings) {
  const newRatings = merge({}, oldRatings);

  messages.forEach((message) => {
    const {
      value: {
        type,
        data: {
          review_snapshot: { vfm_rating },
        },
      },
    } = message;

    if (!vfm_rating) return;
    const ratingClass = newRatings[vfm_rating];
    const offset = type === MESSAGE_TYPE.reviewPublished ? 1 : -1;
    const newTotal = Math.max(0, ratingClass.total + vfm_rating * offset);

    newRatings[vfm_rating] = { ...ratingClass, total: newTotal };
  });

  return newRatings;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Check if an specific app block wsa added to a template file.
 */
export const containsAppBlock = (
  templateJSONAssetContent,
  appBlockName,
  themeAppExtensionUuid
) => {
  const regExp = new RegExp(
    `shopify:\/\/apps\/.*\/blocks\/${appBlockName}\/${themeAppExtensionUuid}`
  );

  let parsedContent = undefined;

  try {
    parsedContent = JSON.parse(templateJSONAssetContent);
  } catch (err) {
    console.error(err);
  }

  /**
   * Retrieves all blocks belonging to template sections
   */
  const sections = Object.values(parsedContent?.sections || {});
  const blocks = sections
    .map(({ blocks = {} }) => Object.values(blocks))
    .flat();

  return blocks.some((block) => regExp.test(block.type));
};
