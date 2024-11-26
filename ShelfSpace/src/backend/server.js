import express from "express";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";
console.log("MongoDB Server URL:", process.env.MONGO_DB_SERVER);

// Connection URL
const url = process.env.MONGO_DB_SERVER;
const client = new MongoClient(url);

// Database Name
const dbName = "ShelfSpace";

let users, bookshelf, bookreview;
async function connectDb() {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    users = db.collection("users");
    bookshelf = db.collection("bookshelf");
    bookreview = db.collection("bookreview");
  
}

connectDb();


const app = express();
const BASE_URL = "https://openlibrary.org/search.json";
app.use(express.json());


//*******************************
// Routes and functions for API 
//*******************************
app.get("/search/isbn/:isbn", async (req,res) => {
    const { isbn } = req.params;
  
    if (!isbn) {
      return res.status(400).send("Missing 'isbn' query parameter"); // Handle missing query parameter
    }
  
    try{
      const { data } = await axios.get(BASE_URL, {
        params: {
          isbn, // Open Library expects 'title' as the query parameter
        },
      });
  
      const extractedData = extractBookData(data.docs);
      res.json(extractedData);
  
    }catch(error){
      console.error("Error fetching search results:", error);
      res.status(500).send("Error fetching search results");
    }
  });
  
  app.get("/search/title", async (req,res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).send("Missing 'title' query parameter"); // Handle missing query parameter
  }

  try{
    const { data } = await axios.get(BASE_URL, {
      params: {
        title, // Open Library expects 'title' as the query parameter
      },
    });

    const extractedData = extractBookData(data.docs);
    res.json(extractedData);

  }catch(error){
    console.error("Error fetching search results:", error);
    res.status(500).send("Error fetching search results");
  }
});

app.get("/search/author", async (req,res) => {
    const { author } = req.query;
  
    if (!author) {
      return res.status(400).send("Missing 'author' query parameter"); // Handle missing query parameter
    }
  
    try{
      const { data } = await axios.get(BASE_URL, {
        params: {
          author, // Open Library expects 'author' as the query parameter
        },
      });

      const extractedData = extractBookData(data.docs);
      res.json(extractedData);
  
    }catch(error){
      console.error("Error fetching search results:", error);
      res.status(500).send("Error fetching search results");
    }
  });
  
  const extractBookData = (docs) => {
    return docs.map((doc) => ({
      title: doc.title || null,
      isbn: doc.isbn || null,
      author_name: doc.author_name || null,
      first_publish_year: doc.first_publish_year || null,
      publish_year: doc.publish_year || null,
      publisher: doc.publisher || null,
      ratings_average: doc.ratings_average || null,
      first_sentence: doc.first_sentence || null,
      subject: doc.subject || null,
      subject_key: doc.subject_key || null,
    }));
  };


//*******************************
// Routes for writing to mongodb 
//*******************************
app.post("/bookshelf/newbookshelf", async (req, res) =>{
    try{
        const { username, shelfname } = req.body;
        if (!username || !shelfname) {
            return res.status(400).json({ error: "Username and shelf name are required" });
        }

        // Check for duplicate combination of username and shelfname
        const existingBookshelf = await bookshelf.findOne({ username, shelfname });

        if (existingBookshelf) {
            return res.status(409).json({ error: `Bookshelf '${shelfname}' already exists for user '${username}'` });
        }
        const newBookshelf = {
            username : username,
            shelfname : shelfname
          };
          const result = await bookshelf.insertOne(newBookshelf);
          res.status(201).json("Bookshelf '"+ shelfname +"' created successfully: " + result);
      
    }catch (error){
        console.error(error);
        res.status(500).json({ error: "An error occurred creating bookshelf" });
            
    }
});

app.post("/bookshelf/addbook", async (req, res) => {
    try {
        const { username, shelfname, book } = req.body;

        // Validate input
        if (!username || !shelfname || !book) {
            return res.status(400).json({
                error: "Username, shelf name, and book information are required",
            });
        }

        const { title, author, isbn, publish_year } = book;

        // Validate book fields
        if (!title || !author || !isbn || !publish_year) {
            return res.status(400).json({
                error: "Book must have a title, author, isbn, and publish_year",
            });
        }

        // Check if the bookshelf exists
        const existingBookshelf = await bookshelf.findOne({ username, shelfname });

        if (!existingBookshelf) {
            return res.status(404).json({
                error: `Bookshelf '${shelfname}' for user '${username}' not found`,
            });
        }

        // Check if the book already exists in the bookshelf (by isbn)
        const bookExists = existingBookshelf.books?.some((b) => b.isbn === isbn);

        if (bookExists) {
            return res.status(409).json({
                error: `Book with ISBN '${isbn}' already exists in the bookshelf '${shelfname}'`,
            });
        }


        // Add the book to the bookshelf
        const result = await bookshelf.updateOne(
            { username, shelfname },
            { $push: { books: book } } // Append the book to the 'books' array
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({
                message: `Book '${title}' added to bookshelf '${shelfname}' for user '${username}'`,
            });
        } else {
            res.status(500).json({
                error: "An error occurred while adding the book",
            });
        }
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "An error occurred while adding the book" });
    }
});

app.delete("/bookshelf/removebook", async (req, res) => {
    try {
        const { username, shelfname, isbn } = req.body;

        // Validate input
        if (!username || !shelfname || !isbn) {
            return res.status(400).json({
                error: "Username, shelf name, and ISBN are required",
            });
        }

        // Check if the bookshelf exists
        const existingBookshelf = await bookshelf.findOne({ username, shelfname });

        if (!existingBookshelf) {
            return res.status(404).json({
                error: `Bookshelf '${shelfname}' for user '${username}' not found`,
            });
        }

        // Check if the book exists in the bookshelf (by ISBN)
        const bookExists = existingBookshelf.books?.find((b) => b.isbn === isbn);

        if (!bookExists) {
            return res.status(404).json({
                error: `Book with ISBN '${isbn}' not found in the bookshelf '${shelfname}'`,
            });
        }

        // Update the book to mark it as deleted
        const result = await bookshelf.updateOne(
            { username, shelfname, "books.isbn": isbn },
            { $set: { "books.$.isDeleted": true } } // Mark the book as deleted
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({
                message: `Book with ISBN '${isbn}' marked as deleted in bookshelf '${shelfname}' for user '${username}'`,
            });
        } else {
            res.status(500).json({
                error: "An error occurred while marking the book as deleted",
            });
        }
    } catch (error) {
        console.error("Error removing book:", error);
        res.status(500).json({ error: "An error occurred while removing the book" });
    }
});


app.get("/bookshelf/getbooks", async (req, res) => {
    try {
        const { username, shelfname } = req.query;

        // Validate input
        if (!username || !shelfname) {
            return res.status(400).json({
                error: "Username and shelf name are required",
            });
        }

        // Retrieve the bookshelf
        const existingBookshelf = await bookshelf.findOne({ username, shelfname });

        if (!existingBookshelf) {
            return res.status(404).json({
                error: `Bookshelf '${shelfname}' for user '${username}' not found`,
            });
        }

        // Filter out soft-deleted books (if using soft delete)
        const activeBooks = existingBookshelf.books?.filter(
            (book) => !book.isDeleted
        ) || [];

        // Return the books
        res.status(200).json({
            username,
            shelfname,
            books: activeBooks,
        });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ error: "An error occurred while retrieving books" });
    }
});

app.delete("/bookshelf/deleteshelf", async (req, res) => {
    try {
        const { username, shelfname } = req.body;

        // Validate input
        if (!username || !shelfname) {
            return res.status(400).json({
                error: "Username and shelf name are required",
            });
        }

        // Find and update the bookshelf to mark it as deleted
        const result = await bookshelf.updateOne(
            { username, shelfname, isDeleted: { $ne: true } }, // Ensure it isn't already deleted
            { $set: { isDeleted: true } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: `Bookshelf '${shelfname}' for user '${username}' not found or already deleted`,
            });
        }

        res.status(200).json({
            message: `Bookshelf '${shelfname}' for user '${username}' marked as deleted successfully`,
        });
    } catch (error) {
        console.error("Error soft deleting bookshelf:", error);
        res.status(500).json({ error: "An error occurred while soft deleting the bookshelf" });
    }
});  
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
