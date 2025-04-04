import { useDispatch } from "react-redux";
import { setDentistData } from "@/store/slices/dentistSlice";
import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./TeamCard.module.css";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";
import TeamMember from "@/types/teamMember"


const TeamCard: React.FC<TeamMember> = ({
  photoUrl,
  name,
  title,
  resumeUrl,
  slug,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setDentistData({
        name,
        photoUrl: typeof photoUrl === "string" ? photoUrl : photoUrl.src,
        title,
        resumeUrl,
        slug,
      })
    );
  };

  return (
    <div className={styles.main}>
      <figure>
        <Image
          src={typeof photoUrl === "string" ? photoUrl : photoUrl.src}
          alt={`${name}'s fotoğrafı`}
          quality={100}
          fill={true}
        />
      </figure>

      <div className={styles.cardInfo}>
        <h2>{name}</h2>
        <h4>{title}</h4>
        <Link href={`/dentist/${slug}`} onClick={handleClick}>
          <AiOutlineLink />
          Özgeçmiş
        </Link>
      </div>
    </div>
  );
};

export default TeamCard;
