import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Landing.css";
import picture from "../assets/buy.png";

const Landing = () => {
  const mainTextRef = useRef(null);
  const loginButtonRef = useRef(null);
  const seeMoreButtonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.from(mainTextRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from([ seeMoreButtonRef.current], {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.7,
    });
  }, []);

  return (
    <div className="h-full min-h-screen">
      <section id="main">
        <div className="main-box">
          <nav>
            <ul>
              <li>
                <a href="#" className="logo">Shopping</a>
              </li>
              <li>
                <i className="bx bxs-cart" />
              </li>
            </ul>
          </nav>
          <div className="main-content">
            <div ref={mainTextRef} className="main-text text-[#013A20] my-4">
              <h1>Book Store For Students</h1>
              <p>
                Welcome to NovelNest – Your Trusted Second-Hand Bookstore!
                <br />📚 Buy & Sell Used Books Easily <br />💰 Affordable Prices for Every Reader <br />🌍 Sustainable Reading – Reduce, Reuse, Read!
                <br /> Find budget-friendly textbooks, rare gems, and classic novels—all in one place.
                <br /> Let’s give books a second life and spread the love for reading! 📖 <br />
              </p>
              <div>
                <a ref={seeMoreButtonRef} href="/login" className="btn1 mb-4">Login</a>
                <a ref={loginButtonRef} href="/all-books" className="btn2 mb-4">See the books..</a>
              </div>
            </div>
            <div className="main-img">
              <img ref={imageRef} src={picture} alt="bookstore" />
            </div>
          </div>
        </div>
      </section>
      <div className="circle1" />
      <div className="circle2" />
    </div>
  );
};

export default Landing;