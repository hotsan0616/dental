import { useDispatch } from "react-redux";
import { setBlogData } from "@/store/slices/blogSlice";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.css";
import { IoIosArrowRoundForward } from "react-icons/io";

interface BlogCardProps {
  id: number;
  title: string;
  snippet: string;
  slug: string;
  date: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  snippet,
  slug,
  date,
  image,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setBlogData({ title: title, photoUrl: image || "", slug: slug }));
  };

  return (
    <div className={styles.blogCardContainer}>
      <Link
        href={`/blogs/${id}`}
        className={styles.imageWrapper}
        onClick={handleClick}
      >
        <figure>
          <Image src={image} alt={title} fill={true} priority />
        </figure>
      </Link>
      <article>
        <Link href={`/blogs/${id}`} onClick={handleClick}>
          <h2>{title}</h2>
        </Link>
        <p className={styles.cardSnippet}>{snippet}</p>
        <p className={styles.cardFooter}>
          <Link href={`/blogs/${id}`} onClick={handleClick}>
            Read More
            <IoIosArrowRoundForward />
          </Link>
          <span>{date}</span>
        </p>
      </article>
    </div>
  );
};

export default BlogCard;
