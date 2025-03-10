import React from "react";
import { motion } from "framer-motion";
import './Landing.css'

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alice Johnson",
      imgsrc:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?t=st=1741606128~exp=1741609728~hmac=092aa447680d7e449bfae5ec1749d03304cd8066ff7a6e6d834341ba9c3575f1&w=1380",
      review: "This bookstore is amazing! I found rare books at great prices.Great deals and easy-to-use website. Will buy again!Great deals and easy-to-use website. Will buy again!",
    },
    {
      id: 2,
      name: "Michael Smith",
      imgsrc:
        "https://img.freepik.com/free-photo/smiling-caucasian-young-guy-wearing-pink-shirt-isolated-white-background_141793-38613.jpg?ga=GA1.1.1646366203.1721816203&semt=ais_hybrid",
      review: "Fast shipping and excellent customer service. Highly recommended!Great deals and easy-to-use website. Will buy again!Great deals and easy-to-use website. Will buy again!",
    },
    {
      id: 3,
      name: "Emily Carter",
      imgsrc:
        "https://img.freepik.com/free-photo/smiling-young-woman-against-white-background_23-2147838684.jpg?ga=GA1.1.1646366203.1721816203&semt=ais_hybrid",
      review: "A wonderful selection of books! Loved the second-hand collection.Great deals and easy-to-use website. Will buy again!Great deals and easy-to-use website. Will buy again!",
    },
    {
      id: 4,
      name: "Alina Brown",
      imgsrc:
        "https://img.freepik.com/free-photo/close-up-outdoor-portrait-attractive-young-european-woman-with-stylish-bob-haircut-spending-time-wild-nature-having-happy-carefree-facial-expression-enjoying-vacations-some-tropical-country_343059-297.jpg?ga=GA1.1.1646366203.1721816203&semt=ais_hybrid",
      review: "Great deals and easy-to-use website. Will buy again!Great deals and easy-to-use website. Will buy again!Great deals and easy-to-use website. Will buy again!",
    },
  ];

  const TestimonialCard = ({ item }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
          rotate: 2,
        }}
        className="bg-white shadow-md p-6 rounded-2xl flex flex-col items-center text-center w-full max-w-xs transform transition-all duration-300"
      >
        <motion.img
          src={item.imgsrc}
          alt={item.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#1a5e2a]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.h5
          className="text-[#1a5e2a] font-semibold text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {item.name}
        </motion.h5>
        <motion.p
          className="text-gray-500 text-sm mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {item.review}
        </motion.p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-16 px-8 bg-[#f0d942]"
    >
      <div>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[#1a5e2a] mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Testimonial;
