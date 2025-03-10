// import { useState } from "react";
// import axios from "axios";
// import { Loader, PlusCircle } from "lucide-react";

// const AddBook = () => {
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     language: "",
//     publisher: "",
//     genre: "",
//     edition: "",
//     publicationYear: "",
//     pages: "",
//     condition: "",
//     price: "",
//     originalPrice: "",
//     stock: "",
//     quantity: "",
//     imprint: "",
//     days: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-books`, book, {
//         withCredentials: true,
//       });
//       setMessage({ type: "success", text: "Book added successfully!" });
//       setBook({
//         title: "",
//         author: "",
//         language: "",
//         publisher: "",
//         genre: "",
//         edition: "",
//         publicationYear: "",
//         pages: "",
//         condition: "",
//         price: "",
//         originalPrice: "",
//         stock: "",
//         quantity: "",
//         imprint: "",
//         days: "",
//       });
//     } catch (error) {
//       setMessage({ type: "error", text: "Failed to add book. Try again!" });
//       console.error("Error adding book:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl transition-all hover:shadow-2xl duration-300">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New Book</h2>

//       {message && (
//         <p className={`text-center p-2 font-semibold ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
//           {message.text}
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title & Author */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="title" value={book.title} onChange={handleChange} required placeholder="Book Title" className="input-field" />
//           <input type="text" name="author" value={book.author} onChange={handleChange} required placeholder="Author Name" className="input-field" />
//         </div>

//         {/* Language & Publisher */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="language" value={book.language} onChange={handleChange} required placeholder="Language" className="input-field" />
//           <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required placeholder="Publisher" className="input-field" />
//         </div>

//         {/* Genre & Edition */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="text" name="genre" value={book.genre} onChange={handleChange} required placeholder="Genre" className="input-field" />
//           <input type="text" name="edition" value={book.edition} onChange={handleChange} required placeholder="Edition" className="input-field" />
//         </div>

//         {/* Year & Pages */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} required placeholder="Publication Year" className="input-field" />
//           <input type="number" name="pages" value={book.pages} onChange={handleChange} required placeholder="Number of Pages" className="input-field" />
//         </div>

//         {/* Condition & Price */}
//         <div className="grid grid-cols-2 gap-4">
//           <select name="condition" value={book.condition} onChange={handleChange} required className="input-field">
//             <option value="">Select Condition</option>
//             <option value="New">New</option>
//             <option value="Like New">Like New</option>
//             <option value="Very Good">Very Good</option>
//             <option value="Good">Good</option>
//             <option value="Acceptable">Acceptable</option>
//           </select>
//           <input type="number" name="price" value={book.price} onChange={handleChange} required placeholder="Selling Price" className="input-field" />
//         </div>

//         {/* Original Price & Stock */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="number" name="originalPrice" value={book.originalPrice} onChange={handleChange} required placeholder="Original Price" className="input-field" />
//           <input type="number" name="stock" value={book.stock} onChange={handleChange} required placeholder="Stock Available" className="input-field" />
//         </div>

//         {/* Quantity & Imprint */}
//         <div className="grid grid-cols-2 gap-4">
//           <input type="number" name="quantity" value={book.quantity} onChange={handleChange} required placeholder="Quantity" className="input-field" />
//           <input type="text" name="imprint" value={book.imprint} onChange={handleChange} required placeholder="Imprint" className="input-field" />
//         </div>

//         {/* Days */}
//         <input type="number" name="days" value={book.days} onChange={handleChange} required placeholder="Days Available" className="input-field" />

//         {/* Submit Button */}
//         <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
//           {loading ? <Loader size={18} className="animate-spin" /> : <PlusCircle size={18} />}
//           {loading ? "Adding..." : "Add Book"}
//         </button>
//       </form>

//       {/* Styles for Inputs */}
//       <style jsx>{`
//         .input-field {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           outline: none;
//           transition: 0.3s;
//           font-size: 16px;
//           background: #f9f9f9;
//         }
//         .input-field:focus {
//           border-color: #007bff;
//           background: white;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddBook;

import { useState } from "react";
import axios from "axios";
import { Loader, PlusCircle, Image } from "lucide-react";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    language: "",
    publisher: "",
    genre: "",
    edition: "",
    publicationYear: "",
    pages: "",
    condition: "",
    price: "",
    originalPrice: "",
    stock: "",
    quantity: "",
    imprint: "",
    days: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      for (let key in book) {
        formData.append(key, book[key]);
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/add-books`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({ type: "success", text: "Book added successfully!" });
      setBook({
        title: "",
        author: "",
        language: "",
        publisher: "",
        genre: "",
        edition: "",
        publicationYear: "",
        pages: "",
        condition: "",
        price: "",
        originalPrice: "",
        stock: "",
        quantity: "",
        imprint: "",
        days: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add book. Try again!" });
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl transition-all hover:shadow-2xl duration-300">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New Book</h2>

      {message && (
        <p className={`text-center p-2 font-semibold ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" value={book.title} onChange={handleChange} required placeholder="Book Title" className="input-field p-2" />
          <input type="text" name="author" value={book.author} onChange={handleChange} required placeholder="Author Name" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="language" value={book.language} onChange={handleChange} required placeholder="Language" className="input-field p-2" />
          <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required placeholder="Publisher" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="genre" value={book.genre} onChange={handleChange} required placeholder="Genre" className="input-field p-2" />
          <input type="text" name="edition" value={book.edition} onChange={handleChange} required placeholder="Edition" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} required placeholder="Publication Year" className="input-field p-2" />
          <input type="number" name="pages" value={book.pages} onChange={handleChange} required placeholder="Number of Pages" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="condition" value={book.condition} onChange={handleChange} required className="input-field p-2">
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Acceptable">Acceptable</option>
          </select>
          <input type="number" name="price" value={book.price} onChange={handleChange} required placeholder="Selling Price" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="originalPrice" value={book.originalPrice} onChange={handleChange} required placeholder="Original Price" className="input-field p-2" />
          <input type="number" name="stock" value={book.stock} onChange={handleChange} required placeholder="Stock Available" className="input-field p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="quantity" value={book.quantity} onChange={handleChange} required placeholder="Quantity" className="input-field p-2" />
          <input type="text" name="imprint" value={book.imprint} onChange={handleChange} required placeholder="Imprint" className="input-field p-2" />
        </div>

        <input type="number" name="days" value={book.days} onChange={handleChange} required placeholder="Days Available" className="input-field p-2" />

        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition">
            <input type="file" accept="image/*" onChange={handleFileChange} hidden />
            <span className="flex items-center gap-2"><Image size={18} /> Upload Image</span>
          </label>
          {preview && <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />}
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
          {loading ? <Loader size={18} className="animate-spin" /> : <PlusCircle size={18} />}
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
          font-size: 16px;
          background: #f9f9f9;
        }
        .input-field:focus {
          border-color: #007bff;
          background: white;
        }
      `}</style>
    </div>
  );
};

export default AddBook;
