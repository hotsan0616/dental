import React, { ReactNode } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ChatBot from "@/components/chat/ChatBot";
import styles from "./RootLayout.module.css";
import 'swiper/css/navigation';
import "swiper/swiper-bundle.css";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.rootLayout}>
      <header className={`container-fluid ${styles.header}`}>
        <Navbar />
      </header>
      <main className={`${styles.main}`}>{children}</main>
      <footer className={`container-fluid ${styles.footer}`}>
        <Footer />
      </footer>
      <ChatBot />
    </div>
  );
};

export default Layout;
