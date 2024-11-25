import express from "express";
import axios from "axios";
//const express = require("express");
//const axios = require("axios");

const app = express();
const BASE_URL = "https://openlibrary.org/search.json";
app.use(express.json());


//Routes

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

  
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
