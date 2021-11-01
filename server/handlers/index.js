import { createClient } from "./client";
import { getOneTimeUrl } from "./mutations/get-one-time-url";
import { getSubscriptionUrl } from "./mutations/get-subscription-url";
import { addReview } from "./mutations/add-review";
import { updateProductRatings } from "./mutations/update-product-ratings";
import { updateProductAvgRating } from "./mutations/update-product-avg-rating";
import { updateProductCameraRatings } from "./mutations/other/update-product-camera-ratings";
import { updateProductCameraAvgRating } from "./mutations/other/update-product-camera-avg-rating";
import { updateProductDisplayRatings } from "./mutations/other/update-product-display-ratings";
import { updateProductDisplayAvgRating } from "./mutations/other/update-product-display-avg-rating";
import { updateProductBatteryRatings } from "./mutations/other/update-product-battery-ratings";
import { updateProductBatteryAvgRating } from "./mutations/other/update-product-battery-avg-rating";
import { updateProductVFMRatings } from "./mutations/other/update-product-vfm-ratings";
import { updateProductVFMAvgRating } from "./mutations/other/update-product-vfm-avg-rating";
import { deleteQueueMessages } from "./mutations/delete-queue-messages";
import { getProductQueueMessages } from "./queries/get-product-queue-messages";
import { getProductRatings } from "./queries/get-product-ratings";
import { getProductCameraRatings } from "./queries/other/get-product-camera-ratings";
import { getProductDisplayRatings } from "./queries/other/get-product-display-ratings";
import { getProductBatteryRatings } from "./queries/other/get-product-battery-ratings";
import { getProductVFMRatings } from "./queries/other/get-product-vfm-ratings";
import { getFirstPublishedProduct } from "./queries/get-first-published-product";

export {
  createClient,
  getOneTimeUrl,
  getSubscriptionUrl,
  addReview,
  deleteQueueMessages,
  getProductQueueMessages,
  getProductRatings,
  updateProductRatings,
  updateProductAvgRating,
  updateProductCameraRatings,
  updateProductCameraAvgRating,
  updateProductDisplayRatings,
  updateProductDisplayAvgRating,
  updateProductBatteryRatings,
  updateProductBatteryAvgRating,
  updateProductVFMRatings,
  updateProductVFMAvgRating,
  getFirstPublishedProduct,
  getProductCameraRatings,
  getProductDisplayRatings,
  getProductBatteryRatings,
  getProductVFMRatings,
};
