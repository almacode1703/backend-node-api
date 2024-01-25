const express = require("express");
const bodyparser = require('body-parser')
const app = express();
const config = require("dotenv").config();
const port = process.env.PORT || 8001;
const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URL;
const Product = require('./models/productModels');
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Connecting to Db using async await
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongo_uri).then(() => {
      console.log("Connected To DB successfully...");
      app.listen(port, () => {
        console.log(`Server listening to PORT : ${port}`);
      });
    });
  } catch (error) {
    console.log("Error connecting to DB");
  }
};

connectToMongo();


// Create a product route
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get All products route
app.get("/products" , async(req, res)=>{
    try{
       const products = await Product.find({})
       res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})

// Specific product with Id
app.get('/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})

// Edit an Existing Product
app.put('/products/:id', async(req, res)=>{
    try{
      const{id} = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body)
      if(!product){
        return res.product(404).json({message : `can not find product with ID : ${id}`})
      }
      const updatedProduct = await Product.findById(id)
      res.status(200).json(updatedProduct)
    }
    catch(error){
       res.status()
    }
})

// Delete an existing Product
app.delete('/products/:id', async(req, res)=>{
    try{
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id)

      if(!product){
        return res.status(404).json({message: "Cant find product with that Id"})
      }
      res.status(200).json(product)
    }
    catch(error){
      res.status(500).json({message: error.message})
    }
})

