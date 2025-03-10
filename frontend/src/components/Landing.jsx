import React from "react";
import "./Landing.css";
import picture from "../assets/buy.png";
const Landing = () => {
  return (
    <div className="h-full min-h-screen" >
      <section id="main">
        <div className="main-box">
          <nav>
            <ul>
              <li>
                <a href="#" className="logo">
                  Shopping
                </a>
              </li>
              <li>
                <i className="bx bxs-cart" />
              </li>
            </ul>
          </nav>
          <div className="main-content">
            <div className="main-text text-[#013A20] my-4">
              <h1>
                Book Store For Students<br />
              </h1>
              {/* <h2></h2> */}
              <p>
                Welcome to NovelNest – Your Trusted Second-Hand Bookstore!{" "}
                {/* <br /> */}
                {/* Discover a world of stories at unbeatable prices! <br />
                At NovelNest, we specialize in second-hand books, offering
                readers an affordable way to explore their favorite genres.{" "} */}
                <br />
                📚 Buy & Sell Used Books Easily <br />
                💰 Affordable Prices for Every Reader <br />
                🌍 Sustainable Reading – Reduce, Reuse, Read! <br />
                {/* Every book deserves a second chance. <br /> */}
                
                Find budget-friendly textbooks, rare gems, and classic
                novels—all in one place. <br />
                {/* By choosing second-hand books, you save money and support
                sustainability. <br /> */}
                Let’s give books a second life and spread the love for reading!
                📖 <br />
              </p>
              <a href="/login" className="btn1 mb-4">
                Login
              </a>
              <a href="/all-books" className="btn2 mb-4">
                See the Books
              </a>
            </div>
            <div className="main-img">
              <img src={picture} alt="food image" />
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
