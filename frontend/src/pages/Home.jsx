import React, { useEffect, useState } from "react";
import Testimonial from "../components/Testimonial";
import BestSeller from "../components/BestSeller";
import Landing from "../components/Landing";
import axios from "axios";

const Home = () => {
  const [bestBooks, setBestBooks] = useState([]);
  

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/all-books`,{
          withCredentials:true
        });
  
        if (!response.data || !Array.isArray(response.data.books)) {
          console.error("Invalid book data format:", response.data);
          return;
        }
  
        setBestBooks(response.data.books.slice(0, 4));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    getAllBooks();
  }, []);
  

  return (
    <div>
      <Landing />
      <BestSeller books={bestBooks} />
      <Testimonial />
    </div>
  );
};

export default Home;
