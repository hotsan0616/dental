import React from "react";
import { useDispatch } from "react-redux";
import { setBlogData } from "@/store/slices/blogSlice";
import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import styles from "./RecommendCard.module.css";
import Link from "next/link";

interface RecommendCardProps {
  photoUrl: string | StaticImageData;
  title: string;
  id: number;
  slug: string;
}

const RecommendCard: React.FC<RecommendCardProps> = ({ photoUrl, title, id, slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    const imageUrl = typeof photoUrl === 'string' ? photoUrl : photoUrl.src;
    
    dispatch(setBlogData({ title, photoUrl: imageUrl, slug }));
    router.push(`/blogs/${id}`);
  };

  return (
    <div className={styles.recommendCardContainer} onClick={handleClick}>
      <figure>
        <picture>
          <Image src={photoUrl} alt={`${title} Photo!`} fill={true} />
        </picture>
      </figure>
      <article>
        <h2>{title}</h2>
      </article>
    </div>
  );
};

export default RecommendCard;
