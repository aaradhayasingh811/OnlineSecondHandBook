import Book from "../models/books.model.js";
import Seller from "../models/seller.model.js";

const allBookController = async (req, res) => {
    try {
      const books = await Book.find({}).exec();
      
      if (books.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      res.status(200).json({ success: true, books });
  
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Error fetching books", 
        error: error.message 
      });
    }
  };


const getSingleBookController = async(req,res) =>{
    try {
      const book = await Book.findById(req.params.id).populate('seller').lean().exec();
      if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ success: true, book });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching book",
            error: error.message
            });
    }
}

const addBookController = async (req, res) => {
  try {
    const {
      title,
      author,
      language,
      publisher,
      genre,
      edition,
      publicationYear,
      pages,
      condition,
      price,
      originalPrice,
      stock,
      quantity,
      imprint,
      days,
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !author ||
      !language ||
      !publisher ||
      !genre ||
      !edition ||
      !publicationYear ||
      !pages ||
      !condition ||
      !price ||
      !originalPrice ||
      !stock
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const sellerId = req.seller.id;
    const seller = await Seller.findById(sellerId); // ✅ FIXED: Await the query

    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    // Create new book
    const newBook = new Book({
      title,
      author,
      language,
      publisher,
      genre,
      edition,
      publicationYear,
      pages,
      condition,
      price,
      originalPrice,
      stock,
      seller: seller._id, 
      quantity: quantity || 1,
      imprint: imprint || "XYZ Publisher",
      days: days || 0,
    });

    // Save the book to the database
    await newBook.save();

    res.status(201).json({ success: true, message: "Book added successfully", book: newBook });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book",
      error: error.message,
    });
  }
};


const filterbooksController = async(req,res) =>{
  try {
    let { sort, language, availability, tag } = req.query;

    let filter = {};

    // Filter by language
    if (language) {
      if(language === "all"){
        filter = {}
      }
      else{

        filter.language = language;
      }
    }

    // Filter by availability
    if (availability === "inStock") {
      filter.stock = { $gt: 0 };
    } else if (availability === "outStock") {
      filter.stock = 0;
    }

    // Search by tag (genre, category, etc.)
    if (tag) {
      filter.genre = { $regex: tag, $options: "i" }; 
    }

    let sortOption = {};
    if (sort === "low-high") {
      sortOption.price = 1; // Sort by price low to high
    } else if (sort === "high-low") {
      sortOption.price = -1; // Sort by price high to low
    } else if (sort === "bestseller") {
      sortOption.reviews = -1; // Sort by most reviews
    } else if (sort === "newest") {
      sortOption.publicationYear = -1; // Sort by newest books
    }

    // Fetch books based on filters
    const books = await Book.find(filter).sort(sortOption);

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


const editBookController = async (req, res) => {
    try {
      const { bookId } = req.params; // Get book ID from request params
      const {
        title,
        author,
        language,
        publisher,
        genre,
        edition,
        publicationYear,
        pages,
        condition,
        price,
        originalPrice,
        stock,
        seller,
        quantity,
        imprint,
        days,
      } = req.body; // Extract fields from request body
  
      // Check if the book exists
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({ success: false, message: "Book not found" });
      }
  
      // Update book details
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
          title: title || existingBook.title,
          author: author || existingBook.author,
          language: language || existingBook.language,
          publisher: publisher || existingBook.publisher,
          genre: genre || existingBook.genre,
          edition: edition || existingBook.edition,
          publicationYear: publicationYear || existingBook.publicationYear,
          pages: pages || existingBook.pages,
          condition: condition || existingBook.condition,
          price: price || existingBook.price,
          originalPrice: originalPrice || existingBook.originalPrice,
          stock: stock || existingBook.stock,
          seller: seller || existingBook.seller,
          quantity: quantity || existingBook.quantity,
          imprint: imprint || existingBook.imprint,
          days: days || existingBook.days,
        },
        {
          new: true, // Return the updated book
          runValidators: true, // Ensure validation rules apply
        }
      );
  
      res.status(200).json({ success: true, message: "Book updated successfully", book: updatedBook });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating book",
        error: error.message,
      });
    }
  };

const searchController = async(req,res) =>{
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Case-insensitive regex search for multiple fields
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { language: { $regex: query, $options: "i" } },
        { publisher: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { edition: { $regex: query, $options: "i" } },
        { condition: { $regex: query, $options: "i" } },
      ],
    }).populate("seller", "name") // Fetch seller name along with books
      .populate("reviews"); // Fetch associated reviews

    res.json(books);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const viewAllBookSpecificSeller = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const books = await Book.find({ seller: sellerId }).populate("seller");

    if (!books.length) {
      return res.status(404).json({ message: "No books found for this seller." });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export  {
    allBookController,
    getSingleBookController,
    addBookController,
    editBookController,
    filterbooksController,
    searchController,
    viewAllBookSpecificSeller
}
  