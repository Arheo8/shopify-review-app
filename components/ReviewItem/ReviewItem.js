import { useMemo } from "react";
import { Heading, Caption } from "@shopify/polaris";
import { formatDate } from "@shopify/dates";
import { Rating } from "components";
import styles from "./ReviewItem.module.css";

export const ReviewItem = ({ review }) => {
  const {
    body,
    created_at,
    email,
    name,
    rating,
    title,
    camera_rating,
    vfm_rating,
    battery_rating,
    display_rating,
  } = review.value;

  const formattedDate = useMemo(() => {
    if (!created_at) return "";

    return formatDate(new Date(created_at), "en", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }, [created_at]);

  return (
    <article className={styles.Content}>
      <Heading element="h3">{title}</Heading>
      <div className={styles.Rating}>
        <Rating value={rating} />
      </div>
      <p>{body}</p>
      <div className={styles.Caption}>
        <Caption>
          Reviewed on {formattedDate} by {name} - {email}
        </Caption>
      </div>
      <div>
        <Rating value={camera_rating} />
        <Rating value={vfm_rating} />
        <Rating value={battery_rating} />
        <Rating value={display_rating} />
      </div>
    </article>
  );
};
