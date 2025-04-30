import { CiTimer } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/layouts/RootLayout";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Blog.module.css";
import RecommendCard from "@/components/cards/RecommendCard";
import { patientApi } from "@/utils/api";

const Blog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!id) return;
      try {
        const blogId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);
        if (isNaN(blogId)) {
          setError('Invalid blog ID');
          return;
        }
        const response = await patientApi.getBlogById(blogId);
        if (response.code === 0 && response.blog) {
          setBlog(response.blog);
          // Fetch related blogs
          const blogsResponse = await patientApi.getBlogs();
          if (blogsResponse.code === 0) {
            setRelatedBlogs(blogsResponse.blogList.filter(b => b.id !== response.blog.id).slice(0, 3));
          }
        } else {
          setError(response.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError('Failed to fetch blog');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  return (
    <RootLayout>
      <section className={styles.main}>
        <div className={`${styles.blogContainer} container`}>
          
          {loading ? (
            <div className={styles.loading}>Loading blog...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : blog ? (
            <>
              <figure>
                <picture>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill={true}
                  />
                </picture>
              </figure>
              <article>
                <h2 className="textHeader">{blog.title}</h2>
                <div className={styles.blogInfo}>
                  <span>
                    <CiTimer/>
                    5min read
                  </span>
                  <span>
                    <MdOutlineDateRange/>
                    {blog.date}
                  </span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </article>
            </>
          ) : null}
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2
            className="textHeader"
            style={{ fontSize: "var(--font-size-lg)" }}
          >
            Recommended Blogs
          </h2>
          <div className={`${styles.recommendContainer}`}>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              className="mySwiper"
              breakpoints={{
                576: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {relatedBlogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <RecommendCard
                    title={blog.title}
                    photoUrl={blog.image}
                    id={blog.id}
                    slug={blog.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default Blog;
