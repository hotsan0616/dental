import { FaBars, FaTimes, FaPhoneAlt, FaUser } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };  

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuActive(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 992) {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const jwtToken = sessionStorage.getItem('jwtToken');
    setIsLoggedIn(!!jwtToken);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`${styles.main} ${scrolled ? styles.shrink : ""} container`}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div
        ref={menuRef}
        className={`${styles.menuContainer} ${menuActive ? styles.menuActive : ""}`}
      >
        <ul className={styles.menu}>
          <li>
            <Link href="/"  onClick={toggleMenu} >Home</Link>
          </li>
          <li>
            <Link href="/about-us"  onClick={toggleMenu} >About-us</Link>
          </li>
          <li>
            <Link href="/clinic"  onClick={toggleMenu} >Clinics</Link>
          </li>
          <li>
            <Link href="/blogs"  onClick={toggleMenu} >Blogs</Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggleMenu}>Contact Us</Link>
          </li>
          <li>
            <Link href={isLoggedIn ? "/profile" : "/login"} onClick={toggleMenu}>
              {menuActive ? "" : <FaUser />}
              {isLoggedIn ? "Profile" : "Login"}
            </Link>
          </li>
          <li>
            <Link href="/get-appointment">
              {menuActive ? "" : <FaPhoneAlt />}
              Appointment
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuActive ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
    </nav>
  );
};

export default Navbar;
