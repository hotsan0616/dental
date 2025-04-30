import React, { useState, useEffect } from "react";
import RootLayout from "@/layouts/RootLayout";
import styles from "./Blogs.module.css";
import Carousel from "@/components/carousel/Carousel";
import BlogCard from "@/components/cards/BlogCard";
import Pagination from "@/components/pagination/Pagination";
import { patientApi } from "@/utils/api";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Array<{
    id: number;
    title: string;
    slug: string;
    snippet: string;
    content: string;
    date: string;
    image: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await patientApi.getBlogs();
        if (response.code === 0) {
          setBlogs(response.blogList);
        } else {
          setError(response.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <RootLayout>
      {/* --- Carousel Section --- */}
      <section className={`${styles.blogsHero} container-fluid`}>
        <Carousel />
      </section>

      {/* --- Blog Cards Section + Pagination --- */}
      <section className={styles.section}>
        <div className={`${styles.articles} container`}>
          <h2 className="textHeader">Blogs</h2>
          {loading ? (
            <div className={styles.loading}>Loading blogs...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            currentItems.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                snippet={blog.snippet}
                slug={blog.slug}
                date={blog.date}
                image={blog.image}
              />
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </RootLayout>
  );
};

export default Blogs;
