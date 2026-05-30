require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middleware 
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

//  database connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected "))
.catch(err => console.log(err));

//  SCHEMA + MODEL
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);


//  POST ROUTE (FORM SAVE)
app.post("/contact", async (req, res) => {
  try {
    const newData = new Contact(req.body);
    await newData.save();
    res.json({ message: "Saved " });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error " });
  }
});


// test route
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on port 5000  ${PORT}`);
});